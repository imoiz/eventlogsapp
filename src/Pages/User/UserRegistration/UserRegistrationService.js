/**
 * User Registration Service
 * 
 * This service file contains:
 * 1. API service methods for user registration and cities data fetching
 * 2. Custom React hooks for component state management
 * 3. Error handling and loading states
 * 4. Form submission logic
 */

import { useState, useEffect } from 'react';

// Base URL for JSON Server API
const API_BASE_URL = 'http://localhost:3002';

/**
 * Function to fetch all cities from the JSON Server
 * @returns {Promise<Array>} Array of city objects with label and value properties
 * @throws {Error} When API request fails or response is not ok
 */
const fnGetCities = async () => {
  try {
    // Make HTTP GET request to fetch cities
    const response = await fetch(`${API_BASE_URL}/cities`);
    
    // Check if response is successful (status 200-299)
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    
    // Parse and return JSON data
    return await response.json();
  } catch (error) {
    // Log error for debugging purposes
    console.error('Error fetching cities:', error);
    // Re-throw error to be handled by calling component
    throw error;
  }
};

/**
 * Function to register a new user by posting to the JSON Server
 * @param {Object} userData - User data object containing userName, city, gender, dob, and active status
 * @returns {Promise<Object>} The created user object from server
 * @throws {Error} When API request fails or response is not ok
 */
const fnRegisterUser = async (userData) => {
  try {
    // Step 1: Get all existing users to determine the next ID
    const existingUsers = await fnGetUsers();
    
    // Step 2: Find the maximum ID from existing users
    let maxId = 0;
    if (existingUsers && existingUsers.length > 0) {
      maxId = Math.max(...existingUsers.map(user => user.id || 0));
    }
    
    // Step 3: Generate next ID by adding 1 to max ID
    const nextId = maxId + 1;
    
    // Step 4: Prepare user data with the new ID
    const userDataWithId = {
      id: nextId,
      ...userData
    };
    
    // Step 5: Make HTTP POST request to create new user
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataWithId)
    });
    
    // Check if response is successful (status 200-299)
    if (!response.ok) {
      throw new Error('Failed to register user');
    }
    
    // Parse and return JSON data
    const createdUser = await response.json();
    
    // Log the created user for debugging
    console.log('User created with ID:', nextId, createdUser);
    
    return createdUser;
  } catch (error) {
    // Log error for debugging purposes
    console.error('Error registering user:', error);
    // Re-throw error to be handled by calling component
    throw error;
  }
};

/**
 * Function to fetch all users from the JSON Server
 * @returns {Promise<Array>} Array of user objects
 * @throws {Error} When API request fails or response is not ok
 */
const fnGetUsers = async () => {
  try {
    // Make HTTP GET request to fetch users
    const response = await fetch(`${API_BASE_URL}/users`);
    
    // Check if response is successful (status 200-299)
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    // Parse and return JSON data
    return await response.json();
  } catch (error) {
    // Log error for debugging purposes
    console.error('Error fetching users:', error);
    // Re-throw error to be handled by calling component
    throw error;
  }
};

/**
 * Service object containing all API methods for User Registration functionality
 */
export const userRegistrationService = {
  getCities: fnGetCities,
  registerUser: fnRegisterUser,
  getUsers: fnGetUsers
};

/**
 * Custom React Hook: useCities
 * 
 * This hook encapsulates the logic for fetching and managing cities data.
 * It provides a clean interface for components to access cities with loading and error states.
 * 
 * @returns {Object} An object containing:
 *   - cities: Array of city objects with label and value properties
 *   - loading: Boolean indicating if data is being fetched
 *   - error: String containing error message if request fails, null otherwise
 */
export const useCities = () => {
  // State to store the fetched cities data
  const [cities, setCities] = useState([]);
  
  // State to track loading status during API call
  const [loading, setLoading] = useState(false);
  
  // State to store any error that occurs during API call
  const [error, setError] = useState(null);

  /**
   * useEffect hook to fetch cities when component mounts
   * Dependency array is empty [], so this runs only once on mount
   */
  useEffect(() => {
    /**
     * Async function to handle the API call
     * Separated into its own function because useEffect callback cannot be async directly
     */
    const fetchCities = async () => {
      // Set loading to true at the start of API call
      setLoading(true);
      
      // Clear any previous errors
      setError(null);
      
      try {
        // Call the API service method
        const citiesData = await userRegistrationService.getCities();
        
        // Update state with fetched data
        setCities(citiesData);
      } catch (err) {
        // Log error for debugging
        console.error('Failed to load cities:', err);
        
        // Set error message in state for UI display
        setError(err.message);
      } finally {
        // Always set loading to false when request completes (success or failure)
        setLoading(false);
      }
    };

    // Execute the fetch function
    fetchCities();
  }, []); // Empty dependency array means this effect runs only once on component mount

  // Return the state values for the component to use
  return { cities, loading, error };
};

/**
 * Custom React Hook: useUserRegistration
 * 
 * This hook encapsulates the logic for user registration functionality.
 * It provides methods and states for registering users with proper error handling.
 * 
 * @returns {Object} An object containing:
 *   - registerUser: Function to register a new user
 *   - loading: Boolean indicating if registration is in progress
 *   - error: String containing error message if registration fails, null otherwise
 *   - success: Boolean indicating if registration was successful
 */
export const useUserRegistration = () => {
  // State to track loading status during registration
  const [loading, setLoading] = useState(false);
  
  // State to store any error that occurs during registration
  const [error, setError] = useState(null);
  
  // State to track successful registration
  const [success, setSuccess] = useState(false);

  /**
   * Function to register a new user
   * @param {Object} userData - User data to be registered (userName, city, gender, dob, active)
   */
  const registerUser = async (userData) => {
    // Set loading to true at the start of registration
    setLoading(true);
    
    // Clear any previous errors and success state
    setError(null);
    setSuccess(false);
    
    try {
      // Call the API service method
      const result = await userRegistrationService.registerUser(userData);
      
      // Set success state
      setSuccess(true);
      
      // Log successful registration for debugging
      console.log('User registered successfully:', result);
      
      return result;
    } catch (err) {
      // Log error for debugging
      console.error('Failed to register user:', err);
      
      // Set error message in state for UI display
      setError(err.message);
      
      // Re-throw error for component to handle if needed
      throw err;
    } finally {
      // Always set loading to false when registration completes (success or failure)
      setLoading(false);
    }
  };

  // Return the function and state values for the component to use
  return { registerUser, loading, error, success };
};