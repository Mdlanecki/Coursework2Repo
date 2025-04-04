package com.stravacopy.backend.Repository;

import com.stravacopy.backend.Model.TableName;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TableNameRepo extends MongoRepository<TableName, String> { //primary key datatype
}
