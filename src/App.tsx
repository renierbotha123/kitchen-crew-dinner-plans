
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { MealPlanProvider } from "./contexts/MealPlanContext";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { BottomNavigation } from "./components/Layout/BottomNavigation";
import { Dashboard } from "./pages/Dashboard";
import { Calendar } from "./pages/Calendar";
import { Cart } from "./pages/Cart";
import { Profile } from "./pages/Profile";
import { Recipes } from "./pages/Recipes";
import { RecipeDetail } from "./pages/RecipeDetail";
import { Notes } from "./pages/Notes";
import { Welcome } from "./pages/Welcome";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { HouseholdSetup } from "./pages/HouseholdSetup";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  
  // Don't show bottom nav on auth screens
  const authRoutes = ['/welcome', '/signup', '/login', '/household-setup'];
  const showBottomNav = !authRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/* Household Setup - Protected but no household required */}
        <Route path="/household-setup" element={
          <ProtectedRoute>
            <HouseholdSetup />
          </ProtectedRoute>
        } />
        
        {/* Main App Routes - Protected and require household */}
        <Route path="/" element={
          <ProtectedRoute requireHousehold={true}>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/calendar" element={
          <ProtectedRoute requireHousehold={true}>
            <Calendar />
          </ProtectedRoute>
        } />
        
        <Route path="/recipes" element={
          <ProtectedRoute requireHousehold={true}>
            <Recipes />
          </ProtectedRoute>
        } />
        
        <Route path="/recipes/:id" element={
          <ProtectedRoute requireHousehold={true}>
            <RecipeDetail />
          </ProtectedRoute>
        } />
        
        <Route path="/cart" element={
          <ProtectedRoute requireHousehold={true}>
            <Cart />
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute requireHousehold={true}>
            <Profile />
          </ProtectedRoute>
        } />
        
        <Route path="/notes" element={
          <ProtectedRoute requireHousehold={true}>
            <Notes />
          </ProtectedRoute>
        } />
        
        {/* Menu Routes */}
        <Route path="/help" element={
          <ProtectedRoute requireHousehold={true}>
            <NotFound />
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute requireHousehold={true}>
            <NotFound />
          </ProtectedRoute>
        } />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Bottom Navigation - shown on protected pages only */}
      {showBottomNav && <BottomNavigation />}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <MealPlanProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </MealPlanProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
