import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { useQuery } from "@tanstack/react-query";
import { useState as useStateHook } from "react";
import { Home, Map, Calendar, BarChart3, Menu } from "lucide-react";
import HostelCard from "@/components/hostel-card";
import BookingModal from "@/components/booking-modal";
import StudentDashboard from "@/components/student-dashboard";
import AgentDashboard from "@/components/agent-dashboard";
import AdminDashboard from "@/components/admin-dashboard";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [selectedArea, setSelectedArea] = useState("");
  const [roomType, setRoomType] = useState("");
  const [amenities, setAmenities] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState<any>(null);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Fetch hostels
  const { data: hostels = [], isLoading: hostelsLoading } = useQuery({
    queryKey: ["/api/hostels"],
    enabled: isAuthenticated,
  });

  // Fetch bookings
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ["/api/bookings"],
    enabled: isAuthenticated,
  });

  const handleBookInspection = (hostel: any) => {
    setSelectedHostel(hostel);
    setShowBookingModal(true);
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="loading-dashboard">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-background/95 backdrop-blur-md shadow-sm border-b-2 border-border sticky top-0 z-50" data-testid="header-dashboard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-gradient" data-testid="text-logo">CampusHostel</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <a href="#" className="text-foreground hover:text-primary px-3 py-2 rounded-lg text-sm font-medium transition-colors" data-testid="link-browse-hostels">Browse Hostels</a>
                {user?.role === 'agent' && (
                  <a href="#" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg text-sm font-medium transition-colors" data-testid="link-list-property">List Property</a>
                )}
                <a href="#" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg text-sm font-medium transition-colors" data-testid="link-help">Help</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground font-medium" data-testid="text-user-welcome">
                Welcome, {user?.firstName || user?.email}
              </span>
              <ThemeToggle />
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="text-sm border-2 hover:bg-primary hover:text-primary-foreground transition-all focus-ring"
                data-testid="button-logout"
              >
                Sign Out
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden hover:bg-secondary" data-testid="button-menu-mobile">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="hostels" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-secondary/50 p-1 rounded-xl border-2 border-border/50" data-testid="tabs-navigation">
            <TabsTrigger value="hostels" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all" data-testid="tab-hostels">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Browse Hostels</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all" data-testid="tab-map">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Map View</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all" data-testid="tab-bookings">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">My Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all" data-testid="tab-dashboard">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Dashboard</span>
            </TabsTrigger>
          </TabsList>

          {/* Hostel Listings Tab */}
          <TabsContent value="hostels" className="space-y-8 mt-8" data-testid="content-hostels">
            {/* Filters */}
            <Card className="border-2 border-border/50 shadow-lg" data-testid="card-filters">
              <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3" data-testid="label-area">Area</label>
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger className="w-full h-12 rounded-lg border-2 focus-ring" data-testid="select-area">
                      <SelectValue placeholder="All areas" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      <SelectItem value="westend" data-testid="option-westend">Westend</SelectItem>
                      <SelectItem value="safari" data-testid="option-safari">Safari</SelectItem>
                      <SelectItem value="chapel-road" data-testid="option-chapel-road">Chapel Road</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3" data-testid="label-room-type">Room Type</label>
                  <Select value={roomType} onValueChange={setRoomType}>
                    <SelectTrigger className="w-full h-12 rounded-lg border-2 focus-ring" data-testid="select-room-type">
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      <SelectItem value="single" data-testid="option-single">Single Room</SelectItem>
                      <SelectItem value="shared" data-testid="option-shared">Shared Room</SelectItem>
                      <SelectItem value="self-contain" data-testid="option-self-contain">Self Contain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3" data-testid="label-amenities">Amenities</label>
                  <Select value={amenities} onValueChange={setAmenities}>
                    <SelectTrigger className="w-full h-12 rounded-lg border-2 focus-ring" data-testid="select-amenities">
                      <SelectValue placeholder="Any amenities" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      <SelectItem value="wifi" data-testid="option-wifi">WiFi</SelectItem>
                      <SelectItem value="generator" data-testid="option-generator">Generator</SelectItem>
                      <SelectItem value="water" data-testid="option-water">24/7 Water</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button 
                    variant="secondary" 
                    className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold transition-all focus-ring shadow-md"
                    data-testid="button-apply-filters"
                  >
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Hostel Grid */}
            {hostelsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse" data-testid={`skeleton-hostel-${i}`}>
                    <div className="h-48 bg-muted"></div>
                    <CardContent className="p-6 space-y-3">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                      <div className="h-8 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : hostels.length === 0 ? (
              <Card className="p-12 text-center" data-testid="empty-state-hostels">
                <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No hostels found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or check back later for new listings.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-hostels">
                {hostels.map((hostel: any) => (
                  <HostelCard 
                    key={hostel.id} 
                    hostel={hostel} 
                    onBookInspection={handleBookInspection}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Map View Tab */}
          <TabsContent value="map" className="space-y-6" data-testid="content-map">
            <Card className="overflow-hidden">
              <div className="h-96 bg-muted flex items-center justify-center relative" data-testid="map-placeholder">
                <div className="text-center">
                  <Map className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Map View</h3>
                  <p className="text-muted-foreground">Google Maps integration showing hostel locations around universities</p>
                </div>
                
                {/* Mock Map Markers */}
                <div className="absolute top-20 left-32 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium" data-testid="marker-westend">
                  Westend (15)
                </div>
                <div className="absolute top-32 right-24 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium" data-testid="marker-safari">
                  Safari (8)
                </div>
                <div className="absolute bottom-24 left-24 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium" data-testid="marker-chapel">
                  Chapel Road (12)
                </div>
              </div>
              
              <CardContent className="p-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="bg-primary text-primary-foreground" data-testid="button-all-areas">
                    All Areas
                  </Button>
                  <Button size="sm" variant="secondary" data-testid="button-westend">
                    Westend
                  </Button>
                  <Button size="sm" variant="secondary" data-testid="button-safari">
                    Safari
                  </Button>
                  <Button size="sm" variant="secondary" data-testid="button-chapel-road">
                    Chapel Road
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6" data-testid="content-bookings">
            {bookingsLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse" data-testid={`skeleton-booking-${i}`}>
                    <CardContent className="p-6 space-y-3">
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="h-3 bg-muted rounded w-1/3"></div>
                      <div className="h-3 bg-muted rounded w-1/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <Card className="p-12 text-center" data-testid="empty-state-bookings">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No bookings yet</h3>
                <p className="text-muted-foreground">Start exploring hostels and book your first inspection.</p>
              </Card>
            ) : (
              <div className="space-y-4" data-testid="list-bookings">
                {bookings.map((booking: any) => (
                  <Card key={booking.id} data-testid={`booking-${booking.id}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-semibold text-foreground mr-3" data-testid={`text-booking-title-${booking.id}`}>
                              {booking.hostel?.title || 'Unknown Hostel'}
                            </h3>
                            <span 
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}
                              data-testid={`status-booking-${booking.id}`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <div className="text-muted-foreground text-sm mb-2">
                            <Calendar className="inline h-4 w-4 mr-2" />
                            <span data-testid={`date-booking-${booking.id}`}>
                              {booking.preferredDate ? 
                                `Inspection scheduled for ${new Date(booking.preferredDate).toLocaleDateString()}` :
                                'Date to be confirmed'
                              }
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-2">
                          <Button variant="secondary" size="sm" data-testid={`button-view-details-${booking.id}`}>
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" data-testid={`button-cancel-${booking.id}`}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6" data-testid="content-dashboard">
            {user?.role === 'student' && <StudentDashboard />}
            {user?.role === 'agent' && <AgentDashboard />}
            {user?.role === 'admin' && <AdminDashboard />}
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedHostel && (
        <BookingModal 
          hostel={selectedHostel}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}
