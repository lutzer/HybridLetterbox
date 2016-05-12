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

    get className() { return 'list-view' }

    get tagName() { return 'ul' }

    get childView() { return TagItemView }

    /* methods */
    initialize(options) {
        
        this.collection = new TagCollection();
        this.collection.fetch();
    }
    
}

export default TagListView