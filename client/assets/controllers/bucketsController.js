app.controller('BucketsController', ['BucketFactory', 'UserFactory', '$location', '$routeParams', function(BucketFactory, UserFactory, $location,$routeParams){

  var self = this;

  self.errors = []
	self.buckets = []

  self.index = function(){
		BucketFactory.index(function(res){
			if(res.data.errors){
				for (key in res.data.errors) {
					self.errors.push(res.data.errors[key]['message'])
				}
			} else {
				self.buckets = res.data
			}
		})
	}

  self.index();

  self.find = function(id){
		BucketFactory.find(id, function(bucket){
      console.log("find controller")
      self.bucket = bucket.data
		})
	}

  self.create = function(newBucket){
		console.log(newBucket)
		self.errors = []
    newBucket._user = UserFactory.current_user;
		BucketFactory.create(newBucket, function(res){
			if(res.data.code && res.data.code == 11000){
				self.errors.push('The Bucket must be unique')
			} else
			if(res.data.errors){
				for (key in res.data.errors) {
					self.errors.push(res.data.errors[key]['message'])
				}
			} else {
				self.index()
				self.newBucket = {}
				self.errors = []
        $location.url('/main')
			}
		})
	}

  self.update = function(id){
    console.log("update controller")
    console.log(id);
    BucketFactory.update(id, function(res){
      self.find(id);
      $location.url('/main')
    });
  }



}]);
