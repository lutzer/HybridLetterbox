/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-19 10:23:53
*/

import Marionette from 'marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import _str from 'underscoreString';
import $ from 'jquery';
import Moment from 'moment';
import Config from 'config';
import CommentModel from 'models/comment_model';

import template from 'text!templates/submission_item_tmpl.html';

class SubmissionItemView extends Marionette.ItemView {

	/* properties */
    get template() { return _.template(template) }

    get className() { return 'item-view card' }

    get templateHelpers() {
		return {
			filesUrl : Config.files_url + this.model.get('_id') + '/',
            isAdmin : false,
            text_truncated_short : _str.truncate(this.model.get('text'),Config.stringTruncateShort,'...'),
            text_truncated_long : _str.truncate(this.model.get('text'),Config.stringTruncateLong,'...'),
            dateFromNow: Moment(this.model.get('createdAt')).fromNow()
		}
    }

    events() {
    	return {
            'click .card-bottom' : 'onViewClicked',
    		'click #new-comment-button' : 'onNewCommentButtonClick',
    		'click #delete-comment-button' : 'onDeleteCommentButtonClick',
    	}
    }

    modelEvents() {
    	return {
    		'change': 'render'
    	}
  	}

    /* methods */
    initialize(options) {
        //console.log(this.model);
        
        this.showComments = false;
    }

    onShow() {
        if (this.showComments)
            this.$('.card-comments').removeClass('hidden');
        else
            this.$('.card-comments').addClass('hidden');
    }

    showDetails(show) {
        this.showComments = show;
        this.$('.card-comments').toggleClass('hidden');
    }

    onViewClicked() {
        this.showDetails(!this.showComments);
    }

    onNewCommentButtonClick() {

    	var comment = new CommentModel({
    		text : this.$('#new-comment-text').val(),
    		author : this.$('#new-comment-author').val(),
    		submission: this.model.get('_id')
    	})
    	comment.save(null,{
            error: (model, res) => {
                Backbone.trigger('error','http',res.responseJSON);
            }
        });
    }

    onDeleteCommentButtonClick(event) {
    	var commentId = $(event.target).attr('data-id')
    	var comment = new CommentModel({
    		_id : commentId
    	});
    	comment.destroy();
    }
}

export default SubmissionItemView;