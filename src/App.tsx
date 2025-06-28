
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MealPlanProvider } from "./contexts/MealPlanContext";
import { BottomNavigation } from "./components/Layout/BottomNavigation";
import { Dashboard } from "./pages/Dashboard";
import { Calendar } from "./pages/Calendar";
import { Cart } from "./pages/Cart";
import { Profile } from "./pages/Profile";
import { Recipes } from "./pages/Recipes";
import { RecipeDetail } from "./pages/RecipeDetail";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const showBottomNav = true; // Show bottom nav on all pages

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        {/* Dashboard/Home Route */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Main App Routes */}
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Menu Routes */}
        <Route path="/notes" element={<NotFound />} />
        <Route path="/help" element={<NotFound />} />
        <Route path="/settings" element={<NotFound />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Bottom Navigation - shown on all pages */}
      {showBottomNav && <BottomNavigation />}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <MealPlanProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </MealPlanProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
