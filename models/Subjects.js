/**
 * Created by linhehe on 15/7/31.
 */
var mongoose = require('mongoose');

// 课程表

var SubjectSchema = new mongoose.Schema({
    //
    BeginSubjectDate:Date, // 例：2015-8-1 8:10
    EndSubjectDate:Date, // 例：2015-8-1 9:50
    SubjectName: String,
    ClassRoomName: String, // 教室名
    //Teacher :{type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
    Teacher: String,
    Class:{type: mongoose.Schema.Types.ObjectId, ref: 'Class'},

    Lat: String,
    Lng: String
});

mongoose.model('Subject', SubjectSchema);