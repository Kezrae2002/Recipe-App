#pragma once 
#include <string>
#include <vector>

class BrowseCategories {
private: 
    std::vector<std::string> categories; // List of all categories

public: 

    BrowseCategories();

    // Return all available categories 
    std::vector<std::string> getAllCategories();

    // Check if a category exists 
    bool categoryExists( std::string category);

};
