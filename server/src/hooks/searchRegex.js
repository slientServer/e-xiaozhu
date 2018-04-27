module.exports = function () {
  return function(context){
    var query = context.params.query;
    for (var key in query) {
      if(query[key].$search && key.indexOf('$') === -1) {
        query[key] = {$regex: new RegExp(query[key].$search, 'i')};
      }
    }
    context.params.query = query;
  };
};