/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-12 12:44:36
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
    		//'click' : 'onClick'
    	}
    }

    /* methods */
    initialize(options) {
        //console.log(options)
    }

    setSelected(selected) {
        if (selected)
            this.$el.addClass('selected');
        else
            this.$el.removeClass('selected');
    }

    onClick() {
    	this.setSelected(true);
    }
    
}

export default TagItemView