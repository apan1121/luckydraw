MODE_TYPE=$1

PUBLIC_GIT_IGNORE_PATH="$ABS_DIR/.gitignore"


if [ "$MODE_TYPE" == "dev" ]; then
    echo "設定 git ignore dev 模式";

    echo "
/node_modules/
/vendor/
package-lock.json
composer.lock
/dist
/config/config.php

" > $PUBLIC_GIT_IGNORE_PATH
else
    echo "設定 git ignore prod 模式"
    # echo "執行移除 public 下的 gitignore 程序"
    # rm $PUBLIC_GIT_IGNORE_PATH
    # echo "執行移除 public 下的 gitignore 程序 完成"

    echo "
/node_modules/
/vendor/
package-lock.json
composer.lock
/config/config.php

" > $PUBLIC_GIT_IGNORE_PATH

    rm "$ABS_DIR/dist/.gitignore"
fi
