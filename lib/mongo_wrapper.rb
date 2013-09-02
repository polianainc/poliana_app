require 'mongo'
include Mongo

class MongoWrapper
    def self.collection
        if(@collection)
            return @collection;
        else
            client = MongoClient.new(MONGO_CONFIG['host'], MONGO_CONFIG['port'])
            db = client.db("analytics")
            if MONGO_CONFIG['username']
                db.authenticate(MONGO_CONFIG['username'], MONGO_CONFIG['password'])
            end
            @collection = db.collection("cache")
            return @collection
        end
    end    
end