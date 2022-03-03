import subprocess


def main():
    ret1 = subprocess.call('yarn build', shell=True)
    if ret1 != 0:
        return
    ret2 = subprocess.call("rsync -av -e 'ssh' dist/ lighthouse@gymall.guying18.com:/app/gy-mall", shell=True)
    exit(ret2)


if __name__ == '__main__':
    main()
