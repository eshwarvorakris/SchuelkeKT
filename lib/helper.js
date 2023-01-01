import Swal from "sweetalert2";

export const helper = {
    sweetalert:{toast,confirm}
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

export function confirm(title,icon="success")
{
   return Swal.fire({
        title:title,
        icon:icon,
        showConfirmButton:true,        
      });
}