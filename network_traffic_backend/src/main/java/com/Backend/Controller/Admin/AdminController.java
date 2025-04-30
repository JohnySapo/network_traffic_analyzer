package com.Backend.Controller.Admin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    /*
     ** End point for admin test
     ** URL endpoint: localhost:port/admin/hello
    */
    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello Demo";
    }
}
