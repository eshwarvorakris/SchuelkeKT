import Swal from "sweetalert2";

export const helper = {
  sweetalert: { toast, confirm, warningToast },
  userDetail: { user },
  Capitalize
};

export function toast(title, icon = "success") {
  Swal.fire({
    title: title,
    icon: icon,
    toast: true,
    timer: 5000,
    timerProgressBar: false,
    showConfirmButton: false,
    position: "top"
  });
}

export function warningToast(title, icon = "warning") {
  Swal.fire({
    title: title,
    icon: icon,
    toast: true,
    timer: 5000,
    timerProgressBar: false,
    showConfirmButton: false,
    position: "top"
  });
}

export function confirm(title, icon = "success", cancelButton = false) {
  return Swal.fire({
    title: title,
    icon: icon,
    confirmButtonText: 'Yes',
    showConfirmButton: true,
    showCancelButton: cancelButton,
    confirmButtonColor: '#008bd6',
    cancelButtonColor: '#d33',
  });
}

export function user() {
  //console.log(sessionStorage.getItem("userinfo"));
  return sessionStorage.getItem("userinfo");
  return [];
}

export function Capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}