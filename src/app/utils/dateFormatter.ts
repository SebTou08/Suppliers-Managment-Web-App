import moment from "moment";

export function dateFormatted(date: Date) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a')
}
