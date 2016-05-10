/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-10 16:22:36
*/

import Marionette from 'marionette'
import _ from 'underscore'

import template from 'text!templates/tag_item_tmpl.html';

class TagItemView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'item-view' }

    get tagName() { return 'li' }

    events() {
    	return {
    		'click' : 'onClick'
    	}
    }

    /* methods */
    initialize(options) {
        //console.log(options)
    }

    onClick() {
    	this.$el.toggleClass('selected');
    }
    
}

export default TagItemView