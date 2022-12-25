"""
This is a script to help with the automation of common development tasks.

It requires 'fire' to be installed for the command line automation (i.e.: pip install fire).

Some example commands:

    python -m dev set-version 0.0.2
    python -m dev check-tag-version
    python -m dev vendor-robocorp-ls-core
"""
import sys
import os
import traceback

__file__ = os.path.abspath(__file__)

if not os.path.exists(os.path.join(os.path.abspath("."), "dev.py")):
    raise RuntimeError('Please execute commands from the directory containing "dev.py"')

import fire

try:
    import robotframework_ls
except ImportError:
    # I.e.: add relative path (the cwd must be the directory containing this file).
    sys.path.append("src")
    import robotframework_ls

robotframework_ls.import_robocorp_ls_core()


def _fix_contents_version(contents, version):
    import re

    contents = re.sub(
        r"(version\s*=\s*)\"\d+\.\d+\.\d+", r'\1"%s' % (version,), contents
    )
    contents = re.sub(
        r"(__version__\s*=\s*)\"\d+\.\d+\.\d+", r'\1"%s' % (version,), contents
    )
    contents = re.sub(
        r"(\"version\"\s*:\s*)\"\d+\.\d+\.\d+", r'\1"%s' % (version,), contents
    )
    contents = re.sub(
        r"(blob/robotframework-lsp)-\d+\.\d+\.\d+", r"\1-%s" % (version,), contents
    )

    return contents


def _fix_intellij_contents_version(contents, version):
    new_lines = []
    for line in contents.splitlines():
        if line.startswith("version '"):
            new_lines.append(f"version '{version}'")
        else:
            new_lines.append(line)
    return "\n".join(new_lines)


class Dev(object):
    def set_version(self, version):
        """
        Sets a new version for robotframework-lsp in all the needed files.
        """

        def update_version(version, filepath, fix_func=_fix_contents_version):
            with open(filepath, "r") as stream:
                contents = stream.read()

            new_contents = fix_func(contents, version)
            if contents != new_contents:
                print("Changed: ", filepath)
                with open(filepath, "w") as stream:
                    stream.write(new_contents)

        update_version(version, os.path.join(".", "package.json"))
        update_version(version, os.path.join(".", "src", "setup.py"))
        update_version(
            version, os.path.join(".", "src", "robotframework_ls", "__init__.py")
        )

        update_version(
            version,
            os.path.join("..", "robotframework-intellij", "build.gradle"),
            _fix_intellij_contents_version,
        )

    def get_tag(self):
        import subprocess

        # i.e.: Gets the last tagged version
        cmd = "git describe --tags --abbrev=0 --match robotframework-lsp*".split()
        popen = subprocess.Popen(cmd, stdout=subprocess.PIPE)
        stdout, stderr = popen.communicate()

        # Something as: b'robotframework-lsp-0.0.1'
        if sys.version_info[0] >= 3:
            stdout = stdout.decode("utf-8")
        stdout = stdout.strip()
        return stdout

    def check_tag_version(self):
        """
        Checks if the current tag matches the latest version (exits with 1 if it
        does not match and with 0 if it does match).
        """
        tag = self.get_tag()
        version = tag[tag.rfind("-") + 1 :]

        if robotframework_ls.__version__ == version:
            sys.stderr.write("Version matches (%s) (exit(0))\n" % (version,))
            sys.exit(0)
        else:
            sys.stderr.write(
                "Version does not match (lsp: %s != tag: %s) (exit(1))\n"
                % (robotframework_ls.__version__, version)
            )
            sys.exit(1)

    def remove_vendor_robocorp_ls_core(self):
        import time
        import shutil

        vendored_dir = os.path.join(
            os.path.dirname(__file__),
            "src",
            "robotframework_ls",
            "vendored",
            "robocorp_ls_core",
        )
        try:
            shutil.rmtree(vendored_dir)
            time.sleep(0.5)
        except:
            if os.path.exists(vendored_dir):
                traceback.print_exc()

        return vendored_dir

    def vendor_robocorp_ls_core(self):
        """
        Vendors robocorp_ls_core into robotframework_ls/vendored.
        """
        import shutil

        src_core = os.path.join(
            os.path.dirname(__file__),
            "..",
            "robocorp-python-ls-core",
            "src",
            "robocorp_ls_core",
        )
        vendored_dir = self.remove_vendor_robocorp_ls_core()
        print("Copying from: %s to %s" % (src_core, vendored_dir))

        shutil.copytree(src_core, vendored_dir)
        print("Finished vendoring.")

    def remove_robotframework_interactive(self):
        import time
        import shutil

        vendored_dir = os.path.join(
            os.path.dirname(__file__), "src", "robotframework_ls", "vendored"
        )
        found = []
        for path in ("robotframework_interactive", "vscode-interpreter-webview"):
            target = os.path.join(vendored_dir, path)
            try:
                shutil.rmtree(target)
            except:
                if os.path.exists(target):
                    traceback.print_exc()

            found.append(target)

        time.sleep(0.5)
        return found

    def vendor_robotframework_interactive(self):
        """
        Vendors robotframework_interactive into robotframework_ls/vendored.
        """
        import shutil
        import subprocess

        vendored_src, vendored_webview = self.remove_robotframework_interactive()

        src_core = os.path.join(
            os.path.dirname(__file__),
            "..",
            "robotframework-interactive",
            "src",
            "robotframework_interactive",
        )
        print("=== Copying from: %s to %s" % (src_core, vendored_src))

        shutil.copytree(src_core, vendored_src)

        src_webview = os.path.abspath(
            os.path.join(
                os.path.dirname(__file__),
                "..",
                "robotframework-interactive",
                "vscode-interpreter-webview",
            )
        )
        print("=== Yarn install")
        shell = sys.platform == "win32"
        subprocess.check_call(["yarn", "install"], cwd=src_webview, shell=shell)

        print("=== Building with webpack in: %s" % (vendored_webview,))
        subprocess.check_call(
            ["yarn", "build-prod", "--env", f"target={vendored_webview}"],
            cwd=src_webview,
            shell=shell,
        )

        assert os.path.exists(vendored_webview), f"{vendored_webview} does not exist."
        print(f"Files found in: {vendored_webview}")
        for f in os.listdir(vendored_webview):
            print(f)

        bundle_js = os.path.join(vendored_webview, "bundle.js")
        assert os.path.exists(bundle_js), f"{bundle_js} does not exist."
        print("=== Finished vendoring.")

    def remove_robot_out_stream(self):
        import time
        import shutil

        vendored_dir = os.path.join(
            os.path.dirname(__file__), "src", "robotframework_ls", "vendored"
        )
        found = []
        for path in ("robot_out_stream", "output-webview"):
            target = os.path.join(vendored_dir, path)
            try:
                shutil.rmtree(target)
            except:
                if os.path.exists(target):
                    traceback.print_exc()

            found.append(target)

        time.sleep(0.5)
        return found

    def vendor_robotframework_output_stream(self):
        """
        Vendors robot_out_stream into robotframework_ls/vendored.
        """
        import shutil
        import subprocess

        vendored_dir = os.path.join(
            os.path.dirname(__file__), "src", "robotframework_ls", "vendored"
        )

        vendored_src, vendored_webview = self.remove_robot_out_stream()

        # Always get the latest version.
        subprocess.call(
            [sys.executable]
            + "-m pip install robotframework-output-stream --no-deps --target .".split(),
            cwd=vendored_dir,
        )

        sys.path.insert(0, vendored_src)
        import index

        sys.path.remove(vendored_src)

        os.makedirs(vendored_webview, exist_ok=True)
        with open(
            os.path.join(vendored_webview, "index.html"), "w", encoding="utf-8"
        ) as stream:
            stream.write(index.INDEX_HTML_CONTENTS)

        assert os.path.exists(vendored_src), f"{vendored_src} does not exist."
        assert os.path.exists(vendored_webview), f"{vendored_webview} does not exist."
        print(f"Files found in: {vendored_webview}")
        for f in os.listdir(vendored_webview):
            print(f)

        index_html = os.path.join(vendored_webview, "index.html")
        assert os.path.exists(index_html), f"{index_html} does not exist."
        print("=== Finished vendoring.")

    def fix_readme(self):
        """
        Updates the links in the README.md to match the current tagged version.
        To be called during release.
        """
        import re

        readme = os.path.join(os.path.dirname(__file__), "README.md")
        with open(readme, "r") as f:
            content = f.read()

        tag = self.get_tag()
        if not tag:
            raise AssertionError(
                "Could not get tag! (are you checking out with full tag history?)"
            )

        new_content = re.sub(
            r"\(docs/",
            r"(https://github.com/robocorp/robotframework-lsp/tree/%s/robotframework-ls/docs/"
            % (tag,),
            content,
        )
        with open(readme, "w") as f:
            f.write(new_content)


def test_lines():
    """
    Check that the replace matches what we expect.

    Things we must match:

        version="0.0.1"
        "version": "0.0.1",
        __version__ = "0.0.1"
        https://github.com/robocorp/robotframework-lsp/blob/robotframework-lsp-0.1.1/robotframework-ls/README.md
    """
    from robocorp_ls_core.unittest_tools.compare import compare_lines

    contents = _fix_contents_version(
        """
        version="0.0.198"
        version = "0.0.1"
        "version": "0.0.1",
        "version":"0.0.1",
        "version" :"0.0.1",
        __version__ = "0.0.1"
        https://github.com/robocorp/robotframework-lsp/blob/robotframework-lsp-0.1.1/robotframework-ls/README.md
        """,
        "3.7.1",
    )

    expected = """
        version="3.7.1"
        version = "3.7.1"
        "version": "3.7.1",
        "version":"3.7.1",
        "version" :"3.7.1",
        __version__ = "3.7.1"
        https://github.com/robocorp/robotframework-lsp/blob/robotframework-lsp-3.7.1/robotframework-ls/README.md
        """

    compare_lines(contents.splitlines(), expected.splitlines())


if __name__ == "__main__":
    TEST = False
    if TEST:
        test_lines()
    else:
        # Workaround so that fire always prints the output.
        # See: https://github.com/google/python-fire/issues/188
        def Display(lines, out):
            text = "\n".join(lines) + "\n"
            out.write(text)

        from fire import core

        core.Display = Display

        fire.Fire(Dev())
