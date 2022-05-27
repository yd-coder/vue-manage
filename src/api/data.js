import request from "./request";

export function getData(){
  return request ({
    url:'/home/getData',
    methods:'get',
  })
}

export function getMonthData(){
  return request ({
    url:'/home/getMonthData',
    methods:'get',
  })
}

export function getUser(page,limit){
  return request ({
    url:'/user/getUser',
    methods:'get',
    params: {
      page,
      limit
    }
  })
}
