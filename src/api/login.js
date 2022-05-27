import request from "./request";

export function toLogin(username,password){
  return request ({
    url:'/admin/login',
    method:'post',
    data: {
      username,
      password,
      adminDepartmentId: 1,
      role: 1
    }
  })
}