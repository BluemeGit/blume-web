export function getWishs () {
    return localStorage.getItem('wishs');
};

export function addWish (wish: string) {
    try {
        const wishs = localStorage.getItem('wishs');
        if (wishs) {
            localStorage.setItem('wishs', wishs + wish + ',');
        } else {
            localStorage.setItem('wishs', wish + ',');
        }
    } catch (error: any) {
        return error;
    }
};

export function delWish (wish: string) {
    try {
        const wishs = localStorage.getItem('wishs');
        if (wishs) {
            localStorage.setItem('wishs', wishs.replace(`${wish},`, ''));
        }
    } catch (error: any) {
        return error;
    }
};