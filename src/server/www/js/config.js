define(['exports'], function (exports) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-05 15:54:07
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		web_service_url: '/api/',
		web_socket_url: ':' + window.location.port,
		files_url: '/files/',
		stringTruncateShort: 160,
		stringTruncateLong: 220,

		dataset: null,

		recordsPerPage: 12,

		tags: ['tag1', 'tag2', 'tag3', 'tag4']
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7bUJBU2U7QUFDZCxtQkFBa0IsT0FESjtBQUVkLGtCQUFpQixNQUFJLE9BQU8sUUFBUCxDQUFnQixJQUZ2QjtBQUdkLGFBQVksU0FIRTtBQUlkLHVCQUFxQixHQUpQO0FBS2Qsc0JBQW9CLEdBTE47O0FBT2QsV0FBUyxJQVBLOztBQVNkLGtCQUFnQixFQVRGOztBQVdkLFFBQU0sQ0FBQyxNQUFELEVBQVEsTUFBUixFQUFlLE1BQWYsRUFBc0IsTUFBdEI7QUFYUSxFIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0wNSAxNTo1NDowN1xuKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuXHR3ZWJfc2VydmljZV91cmwgOiAnL2FwaS8nLFxuXHR3ZWJfc29ja2V0X3VybCA6ICc6Jyt3aW5kb3cubG9jYXRpb24ucG9ydCxcblx0ZmlsZXNfdXJsIDogJy9maWxlcy8nLFxuXHRzdHJpbmdUcnVuY2F0ZVNob3J0OiAxNjAsXG5cdHN0cmluZ1RydW5jYXRlTG9uZzogMjIwLFxuXG5cdGRhdGFzZXQ6IG51bGwsXG5cblx0cmVjb3Jkc1BlclBhZ2U6IDEyLFxuXG5cdHRhZ3M6IFsndGFnMScsJ3RhZzInLCd0YWczJywndGFnNCddXG59Il19