/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-12 16:18:47
*/

import Marionette from 'marionette';
import _ from 'underscore';
import TagCollection from 'models/tag_collection';
import TagItemView from 'views/tag_item_view'

class TagListView extends Marionette.CollectionView {

	/* properties */

    get className() { return 'tag-list' }

    get tagName() { return 'ul' }

    get childView() { return TagItemView }

    collectionEvents() { 
    	return {
			'sync' : 'onCollectionLoaded'
		}
	}

    /* methods */
    initialize(options) {

        this.collection = new TagCollection();
        this.collection.fetch();
    }

    setTag(tag) {
    	this.tag = tag;
    	this.children.each( (childView) => {
    		if (childView.model.get('name') == this.tag)
    			childView.setSelected(true);
    		else
    			childView.setSelected(false);
    	});
    }

    onCollectionLoaded() {
    	setTag(this.tag)
    }
}

export default TagListView