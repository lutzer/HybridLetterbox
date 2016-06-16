# SERVER API



## ROUTES

### /api/submissions/

* GET /api/submissions

  ```
  # get all submissions, responds with

  {"docs":[models],"total_records":n}
  ```


* GET /api/submissions/<id>

  ```
  # get single submission, responds with

  {
    "_id": "2ebdb3f0-2dc7-48ff-b449-5e24a0a501ef",
    "updatedAt": "2016-06-16T16:35:52.855Z",
    "createdAt": "2016-06-16T16:35:50.717Z",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nibh elit, pellentesque non massa ullamcorper, molestie consectetur elit. Fusce vulputate rutrum metus, eu egestas quam pellentesque interdum. Aenean quis vulputate ligula, ac laoreet nulla. Duis imperdiet neque vel imperdiet eleifend. Fusce consectetur urna at neque lacinia iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi sit amet porttitor nunc. Nunc id aliquet est. Donec mattis erat in nunc rutrum luctus. In ultricies pulvinar est at pretium. Fusce malesuada cursus mi egestas eleifend. Etiam lobortis, libero eu vehicula convallis, augue ipsum facilisis orci, et pharetra urna nibh rhoncus felis. Sed pharetra auctor mi, nec lacinia eros auctor id. Donec eget ipsum placerat tortor vehicula convallis. Proin in erat imperdiet magna venenatis porta volutpat id dui.",
    "author": "Tim",
    "__v": 1,
    "comments": [],
    "location": [
      0
    ],
    "files": [
      {
        "name": "Outer Cassette v6.png",
        "path": "../files/2ebdb3f0-2dc7-48ff-b449-5e24a0a501ef/Outer Cassette v6.png",
        "filetype": "image/png",
        "_id": "5762d568e02a775c0bc2e6e4"
      }
    ],
    "dataset": "",
    "tags": [],
    "device": "false"
  }
  ```


* POST /api/submissions/

  ```
  # add submission, expects

  {
      text : { type: String, required: true, maxlength: '1500' },
      author: { type: String, required: true, maxlength: '60' },
      device: { type: String, default: false },
      tags : [ { type: String, match: /^\w+$/ } ],
      dataset : { type: String, ref: 'Dataset', default: ''},
      location : { type: [ Number ], default: [ 0 ] }, // [ longitude, latitude ]
  }
  ```


* PUT /api/submissions/<id>

  ```
  # see POST, requires AUTH
  ```

* DELETE /api/submissions/<id>

  ```
  # requires AUTH
  ```



### /api/comments/

* GET /api/comments

  ```
  # get all comments, responds with

  [models]
  ```


* GET /api/comments/<id>

  ```
  # get single comment, responds with

  {
    "_id": "e66fe36c-c651-447c-9f48-9a4cec1d5820",
    "updatedAt": "2016-06-16T16:47:09.202Z",
    "createdAt": "2016-06-16T16:47:09.202Z",
    "text": "Lorem ipsum",
    "submission": "2ebdb3f0-2dc7-48ff-b449-5e24a0a501ef",
    "__v": 0,
    "author": "Testpeter"
  }
  ```


* POST /api/comments

  ```
  # expects
  {
  	submission: { type: String, ref: 'Submission' }, //submission id
      text : { type: String, required: true, maxlength: '800' },
      author: { type: String, default: 'anonymous', maxlength: '60' }
  }
  ```


* DELETE /api/comments/<id>

  ```
  # requires auth
  ```



### /api/file/

* POST /api/file//attach/<submission_id>

  ```
  # adds file to submission, expects single file
  ```

### /api/tags/

* GET /api/tags

  ```
  #returns all tags, responds with

  [{"name":"tag1"},{"name":"tag2"},{"name":"tag3"},{"name":"tag4"}]
  ```