import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToasts } from "../../context/ToastContext";
import { useRecipes } from "../../context/RecipeContext";
import Sidebar from "../../Components/Sidebar/Sidebar";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import { Pagination } from "../../Components/Pagination/Pagination";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const { addToast } = useToasts();
  const { filteredRecipes, loading, error, cuisines, searchQuery, setSearchQuery, selectedCuisine, setSelectedCuisine } = useRecipes();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (error) {
      addToast(error, "error");
    }
  }, [user, navigate, error, addToast]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-content">
        <div className="container">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Explore our sample recipes</p>
          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {/* <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="cuisine-select"
            >
              <option value="">All Cuisines</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select> */}
          </div>
          <div id="recipes" className="recipe-list">
            {loading ? (
              <p>Loading recipes...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : filteredRecipes.length > 0 ? (
              paginatedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          {/* <RecipeForm /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;