import Swal from "sweetalert2";


export const helper = {
    user,
    sweetalert:{toast},
    swrConfig: {
        refreshInterval: 0,
        revalidateOnFocus: false
    }
};

export function toast(title,icon="success")
{
    Swal.fire({
        title:title,
        icon:icon,
        toast:true,
        timer:5000,
        timerProgressBar:false,
        showConfirmButton:false,
        position:"top"
      });
}

export function user()
{
    const user=JSON.parse(sessionStorage.getItem('user'));
    return user;
}