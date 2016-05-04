/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-04 11:40:32
*/

import Marionette from 'marionette'
import _ from 'underscore'

class BaseView extends Marionette.ItemView {

    get template() { return _.template('<div>Hello World</div') }

    get className() { return 'page' }

    initialize(options) {
        console.log(options)
    }
    
}

export default BaseView