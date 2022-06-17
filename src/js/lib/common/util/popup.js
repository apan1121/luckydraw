import swal from 'sweetalert2';
/**
 * https://sweetalert2.github.io/#download
 *
 * icon: success|error|warning|info|question
 */

const config = {
    icon: 'success',
    title: '',
    html: '',
    footer: '',

    allowOutsideClick: true,
    showConfirmButton: false,
    showCloseButton: false,
    showCancelButton: false,

    confirmButtonText: '確認',
    cancelButtonText: '取消',

    didOpen: () => {
        swal.hideLoading();
    },
};


const executeSwal = (msgObj, confirm, cancel) => {
    const msgConfig = Object.assign({}, config, msgObj);
    swal.fire(msgConfig).then((result) => {
        if (result.value) {
            if (typeof confirm === 'function') {
                confirm();
            }
        } else if (result.dismiss === swal.DismissReason.cancel) {
            if (typeof cancel === 'function') {
                cancel();
            }
        }
    });
};

const loading = (msgObj, confirm, cancel) => {
    const msgConfig = {
        ...config,
        icon: '',
        allowOutsideClick: false,
        didOpen: () => {
            swal.showLoading();
        },
        ...msgObj,
    };
    executeSwal(msgConfig, confirm, cancel);
};


const error = (msgObj, confirm, cancel) => {
    const msgConfig = {
        ...config,
        icon: 'error',
        title: '失敗',
        showConfirmButton: true,
        ...msgObj,
    };
    executeSwal(msgConfig, confirm, cancel);
};

const warning = (msgObj, confirm, cancel) => {
    const msgConfig = {
        ...config,
        icon: 'warning',
        title: '警告',
        showConfirmButton: true,
        ...msgObj,
    };
    executeSwal(msgConfig, confirm, cancel);
};

const success = (msgObj, confirm, cancel) => {
    const msgConfig = {
        ...config,
        icon: 'success',
        title: '成功',
        showConfirmButton: true,
        ...msgObj,
    };
    executeSwal(msgConfig, confirm, cancel);
};


const info = (msgObj, confirm, cancel) => {
    const msgConfig = {
        ...config,
        icon: 'info',
        title: '提示',
        showConfirmButton: true,
        ...msgObj,
    };
    executeSwal(msgConfig, confirm, cancel);
};

const confrim = (msgObj, confirm, cancel) => {
    const msgConfig = {
        ...config,
        icon: 'question',
        title: '確認',
        showConfirmButton: true,
        showCancelButton: true,
        ...msgObj,
    };
    executeSwal(msgConfig, confirm, cancel);
};

const close = (msgObj, confirm, cancel) => {
    swal.close();
};

const popup = {
    success,
    warning,
    error,
    info,
    loading,
    close,
    confrim,
};

export default popup;