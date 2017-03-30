app.factory('BucketFactory', function($http){

  var factory = {};

  factory.find = function(id, callback){
    console.log("find factory")
    $http.get('/buckets/' + id).then(callback)
  }

  factory.update = function(id,callback){
    console.log("update factory")
    $http.put('/buckets/' + id).then(callback)
  }

  factory.index = function(callback){
		$http.get('/buckets').then(callback)
	}

  factory.create = function(newBucket, callback){
		$http.post('/buckets', newBucket).then(callback)
	}



  return factory;
});
