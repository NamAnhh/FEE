//validate so dien thoai
export function _validPhone(inputtxt) {
    const phoneno = /(09|03|01[2|6|8|9])+([0-9]{8})\b/;
    if (phoneno.test(inputtxt)) {
        return true;
    }
    return false;
}

//validate so tu nhien 0-> 9
export function _validnumber(inputtxt) {
    const phoneno = /^\d+$/;
    if (phoneno.test(inputtxt)) {
        return true;
    }
    return false;
}

//validate email
export function _validemail(inputtxt) {
    const phoneno = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (phoneno.test(inputtxt)) {
        return true;
    }
    return false;
}