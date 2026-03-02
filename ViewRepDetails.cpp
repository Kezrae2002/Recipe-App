#include "ViewRepDetails.h"
#include <iostream>

ViewRepDetails::ViewRepDetails(const std::string& dbPath) : databasePath(dbPath) {}

std::string ViewRepDetails::getColumnText(sqlite3_stmt* stmt, int col)
{
    const unsigned char* text = sqlite3_column_text(stmt, col);

    return text ? reinterpret_cast<const char*>(text) : "";
}

std::string ViewRepDetails::getRecipeDetails(int RecipeID)
{
    sqlite3* db;
    sqlite3_stmt* stmt;
    std::string result;

    std::string query = "SELECT Recipe.Name, Recipe.Description, Recipe.Instructions, " 
                        "Category.CategoryName " 
                        "FROM Recipe " 
                        "LEFT JOIN Category ON Recipe.CategoryID = Category.CategoryID " 
                        "WHERE Recipe.RecipeID = " + std::to_string(RecipeID) + ";";
                    
    if (sqlite3_open(databasePath.c_str(), &db) != SQLITE_OK)
    {
        return "Error opening database";
    }

    if (sqlite3_prepare_v2(db, query.c_str(), -1, &stmt, nullptr) != SQLITE_OK)
    {
        std::string err = sqlite3_errmsg(db);
        sqlite3_close(db);
        return "SQL error: " + err;
    }

    if (sqlite3_step(stmt) == SQLITE_ROW)
    {
        std::string name = getColumnText(stmt, 0); 
        std::string description = getColumnText(stmt, 1); 
        std::string instructions= getColumnText(stmt, 2); 
        std::string category = getColumnText(stmt, 3);

        result = "Name: " + name + "\n"
                 "Category: " + category + "\n"
                 "Description: " + description + "\n"
                 "Instructions: " + instructions + "\n";
    }
    else
    {
        result = "No recipe found with that ID.";
    }

    sqlite3_finalize(stmt);
    sqlite3_close(db);

    return result;

}
