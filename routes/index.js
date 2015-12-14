var express = require('express');
var router = express.Router();

var async = require('async');

var xlsx = require('node-xlsx');

var mongoose = require('mongoose');

// mongodb://linhehe:hyg&1qaz2wSX@113.31.89.205:27017/school
// mongodb://linhehe:linhehe@113.31.89.205:27017/test
mongoose.connect('mongodb://linhehe:linhehe@113.31.89.205:27017/test', function(err){
  if(err){
    console.error(err);
  } else{
    console.log('mongodb connected');
  }
});

require('../models/Students');
require('../models/Teachers');
require('../models/Classes');
require('../models/Professions');
require('../models/Colleges');
require('../models/Schools');
require('../models/Addresses');
require('../models/SubjectUnits');
require('../models/Subjects');
require('../models/SignIns');
require('../models/Vacations');
require('../models/Messages');
require('../models/Excels');

var Student = mongoose.model('Student');
var Class = mongoose.model('Class');
var Teacher = mongoose.model('Teacher');
var Address = mongoose.model('Address');
var SubjectUnit = mongoose.model('SubjectUnit');
var Subject = mongoose.model('Subject');
var SignIn = mongoose.model('SignIn');
var Vacation = mongoose.model('Vacation');
var Message = mongoose.model('Message');
var Profession = mongoose.model('Profession');
var College = mongoose.model('College');
var School = mongoose.model('School');
var Excel = mongoose.model('Excel');

// **********************************************************************************************************
var BeginDay = new Date('2015-9-7');
var ClassName = '15信管ERP3';
var time = [
  {
    "BeginWeek": 3,
    "EndWeek": 16,
    "BeginSubjectDate": '18:50',
    "EndSubjectDate": '20:40',
    "SubjectName": '实用会计基础',
    "SubjectTeacher": '陈维',
    "Build": 'J3',
    "ClassRoom": '306',
    "TodayWeek": 0 // 星期1
  }
];
//var ClassName = '14游戏软件1班';
//var time =[
//  {
//    "BeginWeek": 2,
//    "EndWeek": 13,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '10:55',
//    "SubjectName": 'Android移动应用开发',
//    "SubjectTeacher": '常亚平',
//    "Build": 'S3',
//    "ClassRoom": '223',
//    "TodayWeek": 0 // 星期1
//  },{
//    "BeginWeek": 14,
//    "EndWeek": 19,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '11:50',
//    "SubjectName": 'Android移动应用开发项目实训',
//    "SubjectTeacher": '常亚平',
//    "Build": 'S3',
//    "ClassRoom": '223',
//    "TodayWeek": 0 // 星期1
//  },{
//    "BeginWeek": 2,
//    "EndWeek": 14,
//    "BeginSubjectDate": '18:50',
//    "EndSubjectDate": '20:40',
//    "SubjectName": 'iOS移动应用开发',
//    "SubjectTeacher": '胡玉贵',
//    "Build": 'S3',
//    "ClassRoom": '209',
//    "TodayWeek": 0 // 星期1
//  },{
//    "BeginWeek": 16,
//    "EndWeek": 19,
//    "BeginSubjectDate": '18:50',
//    "EndSubjectDate": '21:40',
//    "SubjectName": 'iOS移动应用开发项目实训',
//    "SubjectTeacher": '胡玉贵',
//    "Build": 'S3',
//    "ClassRoom": '209',
//    "TodayWeek": 0 // 星期1
//  },{
//    "BeginWeek": 2,
//    "EndWeek": 16,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '11:50',
//    "SubjectName": 'Photoshop图像处理',
//    "SubjectTeacher": '钟丽萍',
//    "Build": 'S1',
//    "ClassRoom": '503',
//    "TodayWeek": 1 // 星期2
//  },{
//    "BeginWeek": 17,
//    "EndWeek": 17,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '10:55',
//    "SubjectName": 'Photoshop图像处理',
//    "SubjectTeacher": '钟丽萍',
//    "Build": 'S1',
//    "ClassRoom": '503',
//    "TodayWeek": 1 // 星期2
//  },{
//    "BeginWeek": 2,
//    "EndWeek": 19,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '11:50',
//    "SubjectName": '数据结构与算法',
//    "SubjectTeacher": '唐懿芳',
//    "Build": 'S3',
//    "ClassRoom": '319',
//    "TodayWeek": 2 // 星期3
//  },{
//    "BeginWeek": 2,
//    "EndWeek": 15,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '11:50',
//    "SubjectName": 'iOS移动应用开发',
//    "SubjectTeacher": '胡玉贵',
//    "Build": 'S3',
//    "ClassRoom": '209',
//    "TodayWeek": 3 // 星期4
//  },{
//    "BeginWeek": 16,
//    "EndWeek": 19,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '11:50',
//    "SubjectName": 'iOS移动应用开发项目实训',
//    "SubjectTeacher": '胡玉贵',
//    "Build": 'S3',
//    "ClassRoom": '209',
//    "TodayWeek": 3 // 星期4
//  },{
//    "BeginWeek": 2,
//    "EndWeek": 13,
//    "BeginSubjectDate": '14:20',
//    "EndSubjectDate": '17:05',
//    "SubjectName": 'Android移动应用开发',
//    "SubjectTeacher": '常亚平',
//    "Build": 'S3',
//    "ClassRoom": '223',
//    "TodayWeek": 3 // 星期4
//  },{
//    "BeginWeek": 12,
//    "EndWeek": 13,
//    "BeginSubjectDate": '18:50',
//    "EndSubjectDate": '20:40',
//    "SubjectName": '就业指导',
//    "SubjectTeacher": '钟耀庆',
//    "Build": 'S3',
//    "ClassRoom": '106',
//    "TodayWeek": 3 // 星期4
//  },{
//    "BeginWeek": 2,
//    "EndWeek": 19,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '11:50',
//    "SubjectName": 'C++面向对象程序设计',
//    "SubjectTeacher": '李彬',
//    "Build": 'S3',
//    "ClassRoom": '223',
//    "TodayWeek": 4 // 星期5
//  },{
//    "BeginWeek": 16,
//    "EndWeek": 17,
//    "BeginSubjectDate": '14:20',
//    "EndSubjectDate": '16:10',
//    "SubjectName": '形势与政策教育',
//    "SubjectTeacher": '周和平',
//    "Build": 'S3',
//    "ClassRoom": '104',
//    "TodayWeek": 4 // 星期5
//  }
//];

//
var arr = ['class1','class2'];
async.each(arr,function(item, callback) {
  Class.findOne({"ClassName": {'$regex': item}}, function(err,classes){
    //
    callback();
    //console.log(item);
  })
}, function(err) {

});

// **************************************************************************************
//async.each(time, function(item, callback) {
//  //
//  Class.findOne({"ClassName": {'$regex': ClassName}}, function(err,classes){
//    //
//    //console.log(item.BeginWeek+" ; "+item.EndWeek);
//    //var BeginDay1 = BeginDay;
//    for(var i=0; i<=(item.EndWeek-item.BeginWeek); i++){
//      var dd = new Date(BeginDay.getFullYear()+'-'+(BeginDay.getMonth()+1)+" "+item.BeginSubjectDate);
//      dd.setDate(BeginDay.getDate()+(item.BeginWeek-2+i)*7+item.TodayWeek);
//      //
//      var ee = new Date(BeginDay.getFullYear()+'-'+(BeginDay.getMonth()+1)+" "+item.EndSubjectDate);
//      ee.setDate(BeginDay.getDate()+(item.BeginWeek-2+i)*7+item.TodayWeek);
//      //
//      for(var j=0; j<classes.Students.length; j++){
//        var signin = new SignIn({
//          StudentId: classes.Students[j],
//          ClassId: classes._id,
//          TeacherName: item.SubjectTeacher,
//          SubjectName: item.SubjectName,
//          BeginSubjectDate: dd, // 起始时间
//          EndSubjectDate: ee, // 结束时间
//          AddressName: item.Build, // 教学楼
//          ClassRoomName: item.ClassRoom, // 教室
//
//          FirstSignInState: 0,
//          SecondSignInState: 0
//        });
//        //signin.save();
//      }
//    }
//    callback();
//  });
//});
//SignIn.find({}, function(err,doc){
//  //console.log(doc);
//  doc.forEach(function(item){
//    console.log(item.BeginSubjectDate.getDay());
//  });
//});
// **************************************************************************************

// 管理后台登陆
router.post('/login', function(req,res,next){
  Teacher.findOne({Number: req.body.Number, Password: req.body.Password}, function(err,teacher){
    if(err){
      next(err);
    } else{
      if(teacher != null){
        //
        req.session.user_id = teacher._id;
        res.jsonp(teacher);
      } else{
        Student.findOne({Number: req.body.Number, Password: req.body.Password, Purview: 4}, function(err, student){
          if(err){
            next(err);
          } else{
            if(student != null){
              //
              req.session.user_id = student._id;
              res.jsonp(student);
            } else{
              res.send('login fail');
            }
          }
        });
      }
    }
  });
});

// 登出
router.get('/logout', function(req,res,next){
  req.session.user_id = null;
  res.jsonp('success');
});


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// 教师上传学生信息表在数据库中添加学生
router.post('/AddStudentIntoDB', function(req,res,next){
  var obj = xlsx.parse('public/files/'+req.body.ClassId+'.xls');
  for(var i=1; i<obj[0].data.length; i++){
    //console.log("Number: "+obj[0].data[i][0]);
    //console.log("StudentName: "+obj[0].data[i][1]);
    //console.log("Sex: "+obj[0].data[i][2]);
    //console.log("ID_card: "+obj[0].data[i][3]);
    //console.log("Phone: "+obj[0].data[i][4]);
    //console.log("FatherPhone: "+obj[0].data[i][5]);
    //console.log("MotherPhone: "+obj[0].data[i][6]);
    //console.log("Dorm: "+obj[0].data[i][7]);
    //console.log("Native: "+obj[0].data[i][8]);
    //console.log("QQ: "+obj[0].data[i][9]);
    var student = new Student({
      Purview: 5,
      StudentName: obj[0].data[i][1],
      Sex: obj[0].data[i][2],
      Photo: 'aa.jpg',
      Number: obj[0].data[i][0],
      Phone: obj[0].data[i][4],
      QQ: obj[0].data[i][9],
      ID_card: obj[0].data[i][3],
      Native: obj[0].data[i][8],
      Password: '123',
      IsSignIn: 0,
      DeviceId: '',
      WiFiSSID: '',
      FatherPhone: obj[0].data[i][5],
      MotherPhone: obj[0].data[i][6],

      //ClassTeacher: '56595322260f6fb6f226df56',

      Classes: req.body.ClassId,
      Professions: req.body.ProfessionId,
      Colleges: req.body.CollegeId
    });
    console.log(student);
    student.save(function(err){
      if(err){
        console.error(err);
      } else{
        console.log('ok');
      }
    });
  }
  res.jsonp('ok');
});
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 导入签到表
router.post('/ImportSignIn', function(req,res,next){
  //
  Subject.find({BeginSubjectDate:'', EndSubjectDate:''});
  //
  //console.log(req.body);
  var BeginDay = new Date(req.body.BeginDay);
  //console.log(BeginDay);
  //console.log(req.body);
  var iferror = false;
  //
 async.each(req.body.time, function(item, callback1) {
    //
   var Lat = '',
       Lng = '';
   switch (item.Build){
     case 'J1':
           Lat = '22.133278';
           Lng = '113.356139';
           break;
     case 'J2':
           Lat = '22.132985';
           Lng = '113.3560';
           break;
     case 'J3':
           Lat = '22.132709';
           Lng = '113.356049';
           break;
     case 'S1':
           Lat = '22.132885';
           Lng = '113.35675';
           break;
     case 'S2':
           Lat = '22.132885';
           Lng = '113.356714';
           break;
     case 'S3':
           Lat = '22.132634';
           Lng = '113.356696';
           break;
     case 'S4':
           Lat = '';
           Lng = '';
           break;
   }
    //
    Class.findOne({ClassName: req.body.ClassName}, function(err,classes){
      //
      var weeks=[];
      //var ClassId = classes._id;
      console.error(classes._id);
      for(var i=0; i<=(parseInt(item.EndWeek)-parseInt(item.BeginWeek)); i++)
      {
        weeks.push(i);
      }
      async.each(weeks,function(i,callback2){
        var dd = new Date(BeginDay.getFullYear()+'-'+(BeginDay.getMonth()+1)+"-"+BeginDay.getDate()+" "+item.BeginSubjectDate);
        dd.setDate(BeginDay.getDate()+(parseInt(item.BeginWeek)-2+i)*7+(parseInt(item.TodayWeek)-1));
        //
        var ee = new Date(BeginDay.getFullYear()+'-'+(BeginDay.getMonth()+1)+"-"+BeginDay.getDate()+" "+item.EndSubjectDate);
        ee.setDate(BeginDay.getDate()+(parseInt(item.BeginWeek)-2+i)*7+(parseInt(item.TodayWeek)-1));
        //
        Subject.findOne({ $or: [
          {$or: [{ BeginSubjectDate: dd }, { EndSubjectDate: ee }]},
          {$or: [{ BeginSubjectDate: ee }, { EndSubjectDate: dd }]}
        ]}, function(err,subject){
          console.info(subject);
          if(subject != null){
            iferror = true;
            callback2();
          } else{
            //
            Subject.create({
              Class: classes._id,
              Teacher: item.SubjectTeacher,
              SubjectName: item.SubjectName,
              BeginSubjectDate: dd, // 起始时间
              EndSubjectDate: ee, // 结束时间
              //AddressName: item.Build, // 教学楼
              ClassRoomName: item.Build+"-"+item.ClassRoom, // 教室

              Lat: Lat,
              Lng: Lng

            },function(err,doc) {
              if(err) next(err);
              Student.find({Classes:classes._id}).exec(function(err,students) {
                async.each(students, function (s, callback3) {
                  var signin = new SignIn({
                    Student: s._id,
                    Subject: doc._id,
                    FirstSignInState: 0,
                    SecondSignInState: 0
                  });
                  console.log(signin);
                  signin.save(function (error, doc) {
                    //
                    console.log("name " + doc.Student);
                    callback3();
                    //
                  });
                }, function (err) {
                  callback2()
                });
              });
            });
          }
        });
      },function(error){
        callback1();
      });
    });
  },function(err){
   if(iferror){
     console.log("error");
     res.jsonp("error");
   } else{
     console.log("finish");
     res.jsonp("finish");
   }
 });
});

// 上传学生信息的Excel表格
router.post('/UploadExcel', function(req,res,next){
  //
  console.log(req.body);
});

// 添加学院
router.post('/AddCollege', function(req,res,next){
  //
  var college = new College({
    CollegeName: req.body.CollegeName
  });
  college.save();
});
// 选择学院
router.get('/ChooseCollege', function(req,res,next){
  //
  College.find({}, function(err,college){
    if(err){
      next(err);
    } else{
      res.json(college);
    }
  });
});
// 添加专业
router.post('/AddProfession', function(req,res,next){
  //
  College.findOne({CollegeName: req.body.CollegeName}, function(err,college){
    //
    var profession = new Profession({
      ProfessionName: req.body.ProfessionName,
      College: college._id
    });
    profession.save();
  });
});
// 选择专业
router.get('/ChooseProfession', function(req,res,next){
  //
  Profession.find({College: req.query.CollegeId}, function(err,professions){
    if(err){
      next(err);
    } else{
      if(professions){
        res.json(professions);
      } else{
        res.send('no');
      }
    }
  });
});
// 添加班级
router.post('/AddClass', function(req,res,next){
  //
  var classes = new Class({
    ClassName: req.body.ClassName,
    Profession: req.body.ProfessionName
  });
  classes.save(function(err){
    if(err){
      next(err);
    } else{
      res.json('ok');
    }
  });
});
// 选择班级
router.get('/ChooseClass', function(req,res,next){
  //
  Class.find({Profession: req.query.ProfessionId}, function(err,calsses){
    if(err){
      next(err);
    } else{
      if(calsses){
        res.json(calsses);
      } else{
        res.send('no');
      }
    }
  });
});






// 添加学生
router.post('/AddStudent', function(req,res,next){
  //
  var student = new Student({
    StudentName: req.body.StudentName,
    Sex: req.body.Sex,
    Number: req.body.Number,
    Phone: req.body.Phone,
    QQ: req.body.QQ,
    Dorm: req.body.Dorm,
    ID_card: req.body.ID_card,
    Native: req.body.Native,

    Classes: req.body.Classes,
    Professions: req.body.Professions,
    Colleges: req.body.Colleges,

    ClassTeacher: req.body.ClassTeacher,
    FatherPhone: req.body.FatherPhone,
    MotherPhone: req.body.MotherPhone
  });
  //console.log(student);
  student.save(function(result){
    if(result == null){
      res.send('success');
    } else{
      res.send('fail');
    }
  });
});
// 删除学生
router.delete('/DeleteStudent', function(req,res,next){
  //
  Student.remove({_id: req.query.StudentId}, function(err,students){
    if(err){
      next(err);
    } else{
      res.send('删除成功');
      console.log('删除成功');
    }
  });
});
// 修改学生
router.put('/UpdateStudent', function(req,res,next){
  //
  /*
   StudentInformation 为json格式
   {
       StudentName: '',
       Number: ''
       ......
   }
   */
  var str = '{\"'+req.body.tag+'\": \"'+req.body.val+'\"}';
  str = JSON.parse(str);
  console.log(str);
  Student.findOneAndUpdate({_id: req.body.id}, str, function(err,doc){
    if(err){
      next(err);
    } else{
      console.log(doc);
      res.send('success');
    }
  });
});

var str = "{\"_id\": \"5603a430065c87e7060865cf\", \"StudentName\": \"456\"}";
str = JSON.parse(str);
//Student.findOneAndUpdate({_id: '5603a430065c87e7060865cf'}, str, function(err,doc){
//  if(err){
//    next(err);
//  } else{
//    console.log(doc);
//  }
//});

// 查询学生
router.get('/FindStudent', function(req,res,next){
  //
  Student.findOne({Number: req.query.Number})
      .populate('Colleges')
      .populate('Professions')
      .populate('Classes')
      .exec(function(err,students){
        if(err){
          next(err);
        } else{
          if(students){
            res.json(students);
          } else{
            res.send('no');
          }
        }
      });
});




// 查看所有学院
router.get('/ViewCollege', function(req,res,next){
  College.find({}, function(err,colleges){
    if(err){
      next(err);
    } else{
      if(colleges){
        res.json(colleges);
      } else{
        res.send('还未添加任何学院');
      }
    }
  })
});
// 查看某个学院的所有专业
router.get('/ViewProfession', function(req,res,next){
  Profession.find({College: req.query.CollegeId}, function(err,professions){
    if(err){
      next(err);
    } else{
      if(professions){
        res.json(professions);
      } else{
        res.send('no');
      }
    }
  });
});
// 查看某个专业的所有班级
router.get('/ViewClasses', function(req,res,next){
  Class.find({Profession: req.query.ProfessionId}, function(err,classes){
    if(err) next(err);
    res.json(classes);
  });
});
// 查看某个班级的所有学生
router.get('/ViewStudents', function(req,res,next){
  Student.find({Classes: req.query.ClassId}, function(err,students){
    if(err){
      next(err);
    } else{
      if(students){
        res.jsonp(students);
      }
    }
  });
});

//var arr = {
//  StudentName: 'linhehe',
//  Sex: 'man',
//  Age: '18',
//  Number: '47',
//  Phone: '110'
//};
//for(var key in arr){
//  console.log(key);
//  console.error(arr[key]);
//}






/*
    签到课程的管理
 */
// 添加课程
//Class.findOne({_id: '5603a41956494f239c9f8937'})
//    .populate('Students')
//    .exec(function(err,classes){
//      //
//      classes.Students.forEach(function(item,callback){
//        //
//        console.log(item._id);
//      });
//    });
router.post('/AddSubject', function(req,res,next){
  //
  Class.findOne({_id: ''}, function(err,classes){
    //
    console.log(classes);
  });
  //var signin = new SignIn({
  //  StudentId: classes.Students[j],
  //  ClassId: classes._id,
  //  TeacherName: item.SubjectTeacher,
  //  SubjectName: item.SubjectName,
  //  BeginSubjectDate: dd, // 起始时间
  //  EndSubjectDate: ee, // 结束时间
  //  AddressName: item.Build, // 教学楼
  //
  //  IsSignIn: 0, // 是否签到 （0为否，1为是）
  //  IsVacation: 0, // 是否请假 （0为否，1为是）
  //
  //  IsTransferClass: 0 // 是否调课（0为否，1为新数据、可用，-1则本签到数据为旧数据、不可用）
  //});
});
// 删除课程
//router.delete('/DeleteSubject', function(req,res,next){
//  //
//});
// 修改课程
//router.put('/UpdateSubject', function(req,res,next){
//  //
//});

//
// 查询课程
//
// 按班级查看
//SignIn.find({ClassId: '55ed4d83100c389106ad7874'})
//    //.select('SubjectName')
//    .exec(function(err,signs){
//      //
//      signs.forEach(function(item,callback){
//        //
//        console.log({
//          SubjectName: item.SubjectName,
//          TeacherName: item.TeacherName,
//          BeginSubjectDate: item.BeginSubjectDate,
//          EndSubjectDate: item.EndSubjectDate
//        });
//      });
//    });
//
// 按任课老师查看
//SignIn.find({TeacherName: '胡玉贵'})
//    .exec(function(err,signs) {
//      //
//      var arr = [];
//      async.each(signs, function(item, callback){
//        //
//        if(arr.length!=0){
//          for(var i=0; i<arr.length; i++){
//            //console.log(typeof item.BeginSubjectDate.toLocaleDateString());
//            //console.error(typeof arr[i].BeginSubjectDate.toLocaleDateString());
//            if(item.BeginSubjectDate.toLocaleDateString() != arr[i].BeginSubjectDate.toLocaleDateString()){
//              //arr.push({
//              //  SubjectName: item.SubjectName,
//              //  TeacherName: item.TeacherName,
//              //  BeginSubjectDate: item.BeginSubjectDate,
//              //  EndSubjectDate: item.EndSubjectDate
//              //});
//              //console.log(item.SubjectName);
//            }
//          }
//        } else{
//          arr.push({
//            SubjectName: item.SubjectName,
//            TeacherName: item.TeacherName,
//            BeginSubjectDate: item.BeginSubjectDate,
//            EndSubjectDate: item.EndSubjectDate
//          });
//        }
//      });
//      //
//      //console.log(arr);
//    });
router.get('/FindSubject', function(req,res,next){
  //
});

// 列出所有的任课教师
router.get('/getTeacher', function(req,res,next){
  SignIn.find({ClassId: req.query.ClassId})
      .distinct('TeacherName', function(err,signs){
        console.log(signs);
        res.json(signs);
      });
});

// 列出该老师上的所有课程
router.get('/getTeacherSubject', function(req,res,next){
  SignIn.find({TeacherName: req.query.TeacherName, ClassId: req.query.ClassId})
      .select('BeginSubjectDate')
      .select('EndSubjectDate')
      .select('SubjectName')
      .exec(function(err,signs){
        var array = signs;
        //console.log(array[0]);
        function ov1(arr){
          //var a1=((new Date).getTime())
          for(var i=0;i<arr.length;i++)
            for(var j=i+1;j<arr.length;j++)
              if(arr[i].BeginSubjectDate.toLocaleString()===arr[j].BeginSubjectDate.toLocaleString()){arr.splice(j,1);j--;}
          //console.info((new Date).getTime()-a1)
          return arr.sort(function(a,b){return a-b});
        }
        console.log(ov1(array));
        res.json(ov1(array));
      });
});

router.put('/updateSignIn', function(req,res,next){
  SignIn.update(
      {BeginSubjectDate: new Date(req.body.old_BeginSubjectDate), ClassId: req.body.ClassId},
      //{_id: req.body._id},
      {$set:{BeginSubjectDate: new Date(req.body.new_BeginSubjectDate), EndSubjectDate: new Date(req.body.new_EndSubjectDate)}},
      {upsert: false, multi: true},
      function(err,signs){
        //
        if(err){
          next(err);
        } else{
          console.log(signs);
          res.json(signs);
        }
      });
});

router.get('/getClassProject', function(req,res,next){
  Subject.aggregate(
    {$match:{Class:mongoose.Types.ObjectId(req.query.ClassId)}},
      {$group:{_id:{id: "$_id",SubjectName:"$SubjectName",Teacher:"$Teacher",BeginSubjectDate:"$BeginSubjectDate",EndSubjectDate:"$EndSubjectDate"}}},
      {$group:{_id:{SubjectName:"$_id.SubjectName"},my:{$push:{id: "$_id.id",Teacher:"$_id.Teacher",BeginSubjectDate:"$_id.BeginSubjectDate",EndSubjectDate:"$_id.EndSubjectDate"}}}}
  , function(err,result){
        if(err){
          next(err);
        } else{
          res.jsonp(result);
        }
      });
  //SignIn.aggregate(
  //  {$match:{"ClassId":mongoose.Types.ObjectId(req.query.ClassId)}},
  //  {$group:{_id:{SubjectName:"$SubjectName",date:"$BeginSubjectDate",BeginSubjectDate:"$BeginSubjectDate",EndSubjectDate:"$EndSubjectDate",TeacherName:"$TeacherName"}}
  //  },
  //  {$group:{_id:{SubjectName:"$_id.SubjectName"}, my: {$push:{date:"$_id.BeginSubjectDate",BeginSubjectDate:"$_id.BeginSubjectDate",EndSubjectDate:"$_id.EndSubjectDate",TeacherName:"$_id.TeacherName"}}}}
  //, function(err,result){
  //      if(err){
  //        next(err);
  //      } else{
  //        res.json(result);
  //      }
  //    });
});

router.delete('/deleteSubject', function(req,res,next){
  console.log(new Date(req.query.BeginSubjectDate));
  Subject.find({Class: req.query.ClassId, BeginSubjectDate: new Date(req.query.BeginSubjectDate)}, function(err, subjects){
    console.log(subjects);
    async.each(subjects, function(subject, callback1){
      SignIn.find({Subject: subject._id}, function(err,signins){
        async.each(signins, function(signin, callback2){
          signin.remove();
          callback2();
        }, function(err){
          if(err) next(err);
          subject.remove();
          callback1();
        });
      });
    }, function(err){
      if(err) next(err);
      res.jsonp('finish');
    });
  });
});

router.get('/getProjectByProjectName', function(req,res,next){
  SignIn.aggregate(
    {$match:{"ClassId":mongoose.Types.ObjectId(req.query.ClassId), "SubjectName":req.query.SubjectName}},
    {$group:{_id:{SubjectName:"$SubjectName",BeginSubjectDate:"$BeginSubjectDate",EndSubjectDate:"$EndSubjectDate"}}},
    {$group:{_id:{SubjectName:"$_id.SubjectName"}, my:{$push:{BeginSubjectDate:"$_id.BeginSubjectDate",EndSubjectDate:"$_id.EndSubjectDate"}}}}
  , function(err,result){
        if(err){
          next(err);
        } else{
          res.jsonp(result);
        }
      });
});

router.post('/addaNewSubject', function(req,res,next){
  var subject = new Subject({
    BeginSubjectDate:Date, // 例：2015-8-1 8:10
    EndSubjectDate:Date, // 例：2015-8-1 9:50
    SubjectName: String,
    ClassRoomName: String, // 教室名
    //Teacher :{type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
    Teacher: String,
    Class:{type: mongoose.Schema.Types.ObjectId, ref: 'Class'},
    //
    Lat: '',
    Lng: ''
  });
});


// 专门给某个人添加课程
router.post('/addSubjectForOne', function(req,res,next){
  //
  var BeginDay = new Date(req.body.BeginDay);
  //
  async.each(req.body.time, function(item, callback1) {
    //
    Student.findOne({Number: '0104150944'}, function(err,stu){
      //
      var weeks=[];
      for(var i=0; i<=(parseInt(item.EndWeek)-parseInt(item.BeginWeek)); i++)
      {
        weeks.push(i);
      }
      async.each(weeks,function(i,callback2){
        var dd = new Date(BeginDay.getFullYear()+'-'+(BeginDay.getMonth()+1)+"-"+BeginDay.getDate()+" "+item.BeginSubjectDate);
        dd.setDate(BeginDay.getDate()+(parseInt(item.BeginWeek)-2+i)*7+(parseInt(item.TodayWeek)-1));
        //
        var ee = new Date(BeginDay.getFullYear()+'-'+(BeginDay.getMonth()+1)+"-"+BeginDay.getDate()+" "+item.EndSubjectDate);
        ee.setDate(BeginDay.getDate()+(parseInt(item.BeginWeek)-2+i)*7+(parseInt(item.TodayWeek)-1));
        //
        var signin = new SignIn({
          StudentId: stu._id,
          ClassId: stu.Classes,
          TeacherName: item.SubjectTeacher,
          SubjectName: item.SubjectName,
          BeginSubjectDate: dd, // 起始时间
          EndSubjectDate: ee, // 结束时间
          AddressName: item.Build, // 教学楼
          ClassRoomName: item.ClassRoom, // 教室

          FirstSignInState: 0,
          SecondSignInState: 0
        });
        console.log(signin);
        signin.save(function(error,doc){
          //
          //console.log("name "+doc.StudentId);
          //callback3();
          callback2();
          //
        });
        //async.each(classes.Students,function(s,callback3){
        //
        //  var signin = new SignIn({
        //    StudentId: s,
        //    ClassId: classes._id,
        //    TeacherName: item.SubjectTeacher,
        //    SubjectName: item.SubjectName,
        //    BeginSubjectDate: dd, // 起始时间
        //    EndSubjectDate: ee, // 结束时间
        //    AddressName: item.Build, // 教学楼
        //    ClassRoomName: item.ClassRoom, // 教室
        //
        //    FirstSignInState: 0,
        //    SecondSignInState: 0
        //  });
        //  console.log(signin);
        //  signin.save(function(error,doc){
        //    //
        //    console.log("name "+doc.StudentId)
        //    callback3();
        //    //
        //  });
        //},function(err){
        //  callback2()
        //});
      },function(error){
        callback1();
      });
    });
  },function(err){
    console.log("finish");
    res.jsonp("finish");
  });
});

router.put('/updateSubject', function(req,res,next){
  Subject.findOneAndUpdate(
      //{Class: req.body.ClassId, BeginSubjectDate: new Date(req.body.old_BeginSubjectDate)},
      {_id: req.body.SubjectId},
      {
        BeginSubjectDate: req.body.BeginSubjectDate,
        EndSubjectDate: req.body.EndSubjectDate
        //SubjectName: req.body.SubjectName,
        //ClassRoomName: req.body.ClassRoomName,
        //Teacher: req.body.Teacher,
        //Class: req.body.ClassId
      }, function(err, subject){
        if(err){
          next(err);
        } else{
          res.jsonp(subject);
        }
      });
});


// 学生旷课情况
router.get('/getAbsenteeism', function(req,res,next){
  var Students = [];
  var Ctnot = 0;
  Student.find({Classes: req.query.ClassId}, function(err,students){
    if(err){
      next(err);
    } else{
      if(students){
        async.each(students, function(student, callback1){
          SignIn.find({StaticsDate: {$gte: new Date(req.query.BeginDay)}, StaticsDate: {$lte: new Date(req.query.EndDay)}, Student: student._id}, function(err,signs){
            async.each(signs, function(sign, callback2){
              Ctnot += sign.Ctnot;
              callback2();
            }, function(err){
              if(err) next(err);
              Students.push({Name: student.StudentName, Ctnot: Ctnot});
              callback1();
            });
          });
        },function(err){
          res.jsonp(Students);
          console.log(Students);
        });

      }
    }
  });
});

// 班级旷课情况
router.get('/getAbsenteeismForClass', function(req,res,next){
  var Classes = [];

  Class.find({Profession: req.query.ProfessionId}, function(err,classes){
    async.each(classes, function(cls, callback1){
      var Ctnot2 = 0;
      var Ctnot = 0;
      Student.find({Classes:cls._id},function(err,students){

        async.each(students,function(student,callback2){
          //
          SignIn.find({StaticsDate: {$gte: new Date(req.query.BeginDay)}, StaticsDate: {$lte: new Date(req.query.EndDay)}, Student: student._id},function(err,signins){
            async.each(signins,function(signin,callback3){
              //
              Ctnot += signin.Ctnot;
              callback3();
              //
            },function(err){
              //
              //Ctnot2 += Ctnot;
              callback2();
              //
            });

          });
          //
        },function(err){
          Ctnot2 += Ctnot;
          Classes.push({Name: cls.ClassName, Ctnot: Ctnot2});
          callback1();
        })

      });
    },function(err){
      res.jsonp(Classes);
    });
  });
});

// 专业旷课情况
router.get('/getAbsenteeismForProfession', function(req,res,next){
  //
  var Professions = [];
  //
  Profession.find({College: req.query.CollegeId}, function(err, professions){
    //
    async.each(professions, function(profession, callback1){
      var ctnot_pro = 0;
      //
      Class.find({Profession: profession._id}, function(err, classes){
        //
        var ctnot_cls = 0;
        async.each(classes, function(cls, callback2){
          //
          var ctnot_stu = 0;
          Student.find({Classes:cls._id},function(err,students){

            async.each(students,function(student,callback3){
              //
              SignIn.find({StaticsDate: {$gte: new Date(req.query.BeginDay)}, StaticsDate: {$lte: new Date(req.query.EndDay)}, Student: student._id},function(err,signins){
                async.each(signins,function(signin,callback4){
                  //
                  ctnot_stu += signin.Ctnot;
                  callback4();
                  //
                },function(err){
                  //
                  callback3();
                  //
                });
              });
              //
            },function(err){
              ctnot_cls += ctnot_stu;
              callback2();
            });
          });
        }, function(err){
          ctnot_pro += ctnot_cls;
          Professions.push({Name: profession.ProfessionName, Ctnot: ctnot_pro});
          callback1();
        });
      });
    }, function(err){
      res.jsonp(Professions);
    });
  });

});

// 学院旷课情况
router.get('/getAbsenteeismForCollege', function(req,res,next){
  //
  var Colleges = [];
  //
  College.find({}, function(err,colleges){
    //
    async.each(colleges, function(college, callback0){
      //
      var ctnot_col = 0;
      var ctnot_pro = 0;
      Profession.find({College: college._id}, function(err, professions){
        //
        async.each(professions, function(profession, callback1){
          //
          Class.find({Profession: profession._id}, function(err, classes){
            //
            var ctnot_cls = 0;
            async.each(classes, function(cls, callback2){
              //
              var ctnot_stu = 0;
              Student.find({Classes:cls._id},function(err,students){

                async.each(students,function(student,callback3){
                  //
                  SignIn.find({StaticsDate: {$gte: new Date(req.query.BeginDay)}, StaticsDate: {$lte: new Date(req.query.EndDay)}, Student: student._id},function(err,signins){
                    async.each(signins,function(signin,callback4){
                      //
                      ctnot_stu += signin.Ctnot;
                      callback4();
                      //
                    },function(err){
                      //
                      callback3();
                      //
                    });
                  });
                  //
                },function(err){
                  ctnot_cls += ctnot_stu;
                  callback2();
                });
              });
            }, function(err){
              ctnot_pro += ctnot_cls;
              callback1();
            });
          });
        }, function(err){
          ctnot_col += ctnot_pro;
          Colleges.push({Name: college.CollegeName, Ctnot: ctnot_col});
          callback0();
        });
      });
    }, function(err){
      res.jsonp(Colleges);
    });
  });
});

// 纪委查看和修改本班学生旷课次数
router.get('/showStudentSignIn', function(req,res,next){
  SignIn.find({Student: req.query.StudentId, Subject: req.query.SubjectId}, function(err,signins){
    if(err) next(err);
    res.jsonp(signins);
  });
});
router.put('/updateStudentCtnot', function(req,res,next){
  SignIn.findOneAndUpdate({_id: req.body.SignInId}, {Ctnot: req.body.Ctnot}, function(err,signin){
    if(err) next(err);
    res.jsonp(signin);
  });
});

module.exports = router;
