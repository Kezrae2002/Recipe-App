#include "BrowseCategories.h"

BrowseCategories::BrowseCategories() {

    categories.push_back("Vegan");
    categories.push_back("Carnivore");
    categories.push_back("Dessert");
    categories.push_back("Quick and Easy");

    }


// Return all categories 

std::vector<std::string> BrowseCategories::getAllCategories() {
    return categories;
}

// Check if category exist

bool BrowseCategories::categoryExists(std::string category) { 
    for (int i = {}; i < categories.size(); i++) {
        if (categories[i] == category) {
            return true;
        }
    }
    return false;
}
