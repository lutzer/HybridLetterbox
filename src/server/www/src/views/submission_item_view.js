/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-11 16:47:29
*/

import Marionette from 'marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
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
            isAdmin : false
		}
    }

    events() {
    	return {
            'click .comment-number' : 'onShowCommentsButtonClick',
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
        
        this.commentsHidden = true;
    }

    onShow() {
        if (this.commentsHidden)
            this.$('.card-comments').addClass('hidden');
        else
            this.$('.card-comments').removeClass('hidden');
    }

    onNewCommentButtonClick() {

    	var comment = new CommentModel({
    		text : this.$('#new-comment-text').val(),
    		author : this.$('#new-comment-author').val(),
    		submission: this.model.get('_id')
    	})
    	comment.save(comment.attributes,{
            error: (model, res) => {
                Backbone.trigger('error','http',res.responseJSON);
            }
        });
    }

    onShowCommentsButtonClick() {
        this.commentsHidden = !this.commentsHidden;
        this.$('.card-comments').toggleClass('hidden');
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