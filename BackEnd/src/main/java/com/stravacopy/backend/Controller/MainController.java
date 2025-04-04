package com.stravacopy.backend.Controller;

import com.stravacopy.backend.Model.TableName;
import com.stravacopy.backend.Repository.TableNameRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class MainController {

@Autowired
TableNameRepo tableNameRepo;

    @GetMapping("/getData")
    public List<TableName> getData(){
        return tableNameRepo.findAll();
    }


}
