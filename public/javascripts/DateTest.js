
var date = new Date() ;

//   开学第一周de星期一日期
var YEAR = 2015 ;
var MONTH = 8 ;
var day = 31 ;

date.setYear(YEAR) ;
date.setMonth(MONTH-1) ;
date.setDate(day);
date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);

//console.log ( date.toLocaleString() ) ;

var startLessonTime = [
	{
		hour : 8 ,
		minute : 10 
	},
	{
		hour : 9 ,
		minute : 5 
	},
	{
		hour : 10 ,
		minute : 10 
	},
	{
		hour : 11 ,
		minute : 5 
	},
	{
		hour : 14 ,
		minute : 30 
	},
	{
		hour : 15 ,
		minute : 25 
	},
	{
		hour : 16 ,
		minute : 20 
	},
	{
		hour : 19 ,
		minute : 00 
	},
	{
		hour : 19 ,
		minute : 50 
	},
	{
		hour : 20 ,
		minute : 40 
	},
	{
		hour : 20 ,
		minute : 50
	}
];

var getDate = function ( a , b , c ) {
	var daynum = (a-1) * 7 + b - 1 ;

	date.setYear(YEAR) ;
	date.setMonth(MONTH-1) ;
	date.setDate(day);
	date.setHours(0);
	date.setMinutes(0);

	date.setTime ( date.getTime() + daynum*86400000 ) ;
	date.setHours ( startLessonTime[c-1].hour ) ;
	date.setMinutes ( startLessonTime[c-1].minute ) ;
	return date.toLocaleString() ;
}
var getStartDate = function ( weekNum, weekDay, lessonNum ) {
/*	var daynum = (weekNum-1) * 7 + weekDay-1 ;
	date.setTime ( date.getTime() + daynum*86400000 ) ;
	date.setHours ( startLessonTime[lessonNum-1] ) ;
*///	return getDate(weekNum, weekDay, lessonNum ).toLocaleString();
	return getDate(weekNum, weekDay, lessonNum );
}
var getEndDate = function ( weekNum , weekDay , lessNum ) {
	date = new Date(getDate ( weekNum , weekDay , lessNum )) ;
	date.setTime ( date.getTime() + 2700000 ) ;
	return date.toLocaleString();
//	return date;
}

var exp = {
	getStartDate : getStartDate ,
	getEndDate   : getEndDate 
}
module.exports = exp ;




