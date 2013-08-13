require 'mongo'
include Mongo

class MongoWrapper
    def self.collection
        if(@collection)
            return @collection;
        else
            client = MongoClient.new('localhost', 27017)
            db = client.db("analytics")
            @collection = db.collection("cache")
            return @collection
        end
    end    
end