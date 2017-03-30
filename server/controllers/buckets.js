var mongoose = require('mongoose');
var User = mongoose.model('User');
var Bucket = mongoose.model('Bucket');

module.exports = {

  index: function(req,res){
    Bucket.find({}).populate('_user').populate('_tag').exec(function(err,doc){
      if(err){
        return res.json(err)
      }
      return res.json(doc);
    })
  },

  find: function(req,res){
    Bucket.findById(req.params.id, function(err,bucket){
      if(err){
        return res.json(err)
      }
      else{
        return res.json(bucket)
      }
    })
  },

  create: function(req,res){
    console.log(req.body);
    var bucket = new Bucket(req.body);
    bucket.save(function(err,doc){
      if(err){
        return res.json(err);
      }
      if(req.body._tag){
        User.findById(req.body._tag, function(err, user2){
          if(err){
            return res.json(err);
          }
          if(user2){
            user2.buckets.push(bucket);
            user2.save(function(err){
              if(err){
                return res.json(err);
              }
              User.findById(req.body._user, function(err, user1){
                if(err){
                  return res.json(err);
                }
                if(user1){
                  user1.buckets.push(bucket);
                  user1.save(function(err){
                    if(err){
                      return res.json(err);
                    }
                    return res.json(doc);
                  })
                }
              })
            })
          }
        })
      }
      else{
        User.findById(req.body._user, function(err, user1){
          if(err){
            return res.json(err);
          }
          if(user1){
            user1.buckets.push(bucket);
            user1.save(function(err){
              if(err){
                return res.json(err);
              }
              return res.json(doc);
            })
          }
        })
      }
    })
  },

  create: function(req,res){
    var bucket = new Bucket(req.body);
    bucket.save(function(err,doc){
      if(err){
        return res.json(err);
      }
      User.findById(req.body._user, function(err, user1){
        if(err){
          return res.json(err);
        }
        user1.buckets.push(bucket);
        user1.save(function(err){
          if(err){
            return res.json(err);
          }
          else if(req.body._tag != undefined){
            User.findById(req.body._tag, function(err, user2){
              if(err){
                return res.json(err);
              }
              user2.buckets.push(bucket);
              user2.save(function(err){
                if(err){
                  return res.json(err);
                }
              })
            })
          }
          return res.json(doc);
        })
      })
    })
  },


  update: function(req, res) {
   Bucket.findById(req.params.id).exec(function(err, bucket) {
     console.log("HEYYYYY")
     if (err) {
       return res.json(err);
     };
     if (bucket.status == "false") {
       bucket.status = "true"
       bucket.save(function(err,bucket){
         if(err){
           return res.json(err);
         }
         else{
           return res.json(bucket)
         }
       })
     }else if (bucket.status == "true") {
       bucket.status = "false"
       bucket.save(function(err,bucket){
         if(err){
           return res.json(err);
         }
         else{
           return res.json(bucket)
         }
      })
    }
   });
  },

}
