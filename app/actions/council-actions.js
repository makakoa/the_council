'use strict';

var Flux = require('../Flux');
var socket = require('../socket');

socket.on('question:new', function(data) {
  CouncilActions.receiveQuestion(data);
});

socket.on('question:ended', function(data) {
  CouncilActions.endQuestion(data);
});

socket.on('question:results', function(data) {
  CouncilActions.questionFinished(data);
});

var CouncilActions = Flux.createActions({
  loadQuestions: function() {
    socket.emit('load:questions', function(data) {
      return {
        actionType: 'LOAD_QUESTIONS',
        data: data
      };
    });
  },
  receiveQuestion: function(data) {
    return {
      actionType: 'RECEIVE_QUESTION',
      data: data
    };
  },
  endQuestion: function(data) {
    return {
      actionType: 'END_QUESTION',
      data: data
    };
  },
  vote: function(data) {
    return {
      actionType: 'VOTE_MADE',
      data: data
    };
  },
  questionFinished: function(data) {
    return {
      actionType: 'QUESTION_FINISHED',
      data: data
    };
  }
});

module.exports = CouncilActions;