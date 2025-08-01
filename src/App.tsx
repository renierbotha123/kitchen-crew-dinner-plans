
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { MealPlanProvider } from "./contexts/MealPlanContext";
import { NotesProvider } from "./contexts/NotesContext";
import { PantryProvider } from "./contexts/PantryContext";
import { ShoppingListProvider } from "./contexts/ShoppingListContext";
import { RecipeFavoritesProvider } from "./contexts/RecipeFavoritesContext";
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
import { HouseholdSelection } from "./pages/HouseholdSelection";
import { InviteAccept } from "./pages/InviteAccept";
import { JoinHousehold } from "./pages/JoinHousehold";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  
  // Don't show bottom nav on auth screens, invite page, and join household page
  const authRoutes = ['/welcome', '/signup', '/login', '/household-setup', '/household-selection'];
  const hideNavRoutes = [...authRoutes, '/invite', '/join-household'];
  const showBottomNav = !hideNavRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith(route + '/')
  );

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        {/* Root redirect to dashboard */}
        <Route path="/" element={
          <ProtectedRoute requireHousehold={true}>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Public Auth Routes */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/* Invitation Route - Public but requires handling in component */}
        <Route path="/invite/:inviteCode" element={<InviteAccept />} />
        
        {/* Join Household Route - Protected */}
        <Route path="/join-household" element={
          <ProtectedRoute>
            <JoinHousehold />
          </ProtectedRoute>
        } />
        
        {/* Household Setup - Protected but no household required */}
        <Route path="/household-setup" element={
          <ProtectedRoute>
            <HouseholdSetup />
          </ProtectedRoute>
        } />
        
        {/* Household Selection - Protected but no household required */}
        <Route path="/household-selection" element={
          <ProtectedRoute>
            <HouseholdSelection />
          </ProtectedRoute>
        } />
        
        {/* Main App Routes - Protected and require household */}
        <Route path="/dashboard" element={
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
        <NotesProvider>
          <PantryProvider>
            <ShoppingListProvider>
              <RecipeFavoritesProvider>
                <MealPlanProvider>
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <AppContent />
                    </BrowserRouter>
                  </TooltipProvider>
                </MealPlanProvider>
              </RecipeFavoritesProvider>
            </ShoppingListProvider>
          </PantryProvider>
        </NotesProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
