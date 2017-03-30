app.controller('UsersController', ['UserFactory','$location', '$cookies','$routeParams', function(UserFactory, $location, $cookies,$routeParams){
	var self = this;
	self.current_user;
	self.users = [];
	self.newUser = {};
	self.errors = [];

	UserFactory.session(function(res){
		if(res){
			self.current_user = res.data;
		} else {
			self.current_user = {};
			$location.url('/');
		}
	})

	self.index = function(){
		UserFactory.index(function(res){
			self.users = res.data;
		})
	}

	self.find = function(){
		UserFactory.find($routeParams.id, function(user){
      self.user = user.data
		})
	}

	self.logout = function(){
		$cookies.remove('user_id');
		$location.url('/');
	}

	self.login = function(loginUser){
		UserFactory.loginUser(loginUser, function(res){
			if(res.data.errors){
				var errors = res.data.errors;
				for(key in errors){
					self.errors.push(errors[key]['message']);
				}
			} else {
				$location.url('/main')
			}
		})
	}

	self.create = function(newUser){
		self.errors = [];
		UserFactory.create(newUser, function(res){
			if(res.data.errors){
				var errors = res.data.errors;
				for(key in errors){
					self.errors.push(errors[key]['message']);
				}
			} else {
				self.newUser = {};
				$location.url('/');
			}
		})
	}

}])
