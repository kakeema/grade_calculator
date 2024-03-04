<?php

class User {
    private $id;
    private $givenName;
    private $familyName;

    private $email;
    
    function __get($name)
    {
        return $this->$name;
    }
    function __set($name, $value)
    {
        $this->$name = $value;
    }

    // You do have the option of simply removing the magic construct function, 
    // since we are working with databases, and using the fetchALL method, which is populating the data directly,
    //this would work without it.
    function __construct($firstName = "John", $lastName = "Doe") // the passed in parameter $firstName and $lastName are different to the private givenName & private familyName
    {
        if(empty($this->givenName)) { // Checking if the private givenName is empty, if it is then we assign it the value of the default that we set in the parameter $lastName = "Doe";
            $this->givenName = $lastName;
        }
        if(empty($this->familyName)) { // Likewise for the familyName & firstName.
            $this->familyName = $firstName;
        }
    }

    function getFullName()
    {
        return "$this->familyName, $this->givenName";
    }
}

?>