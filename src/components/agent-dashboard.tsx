import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Plus, BarChart3, Home, Calendar, Star } from "lucide-react";

export default function AgentDashboard() {
  const { data: hostels = [] } = useQuery({
    queryKey: ["/api/agent/hostels"],
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ["/api/bookings"],
  });

  const activeListings = hostels.filter((h: any) => h.availability).length;
  const pendingBookings = bookings.filter((b: any) => b.status === 'pending').length;

  return (
    <div className="space-y-6" data-testid="agent-dashboard">
      <Card data-testid="card-agent-overview">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Agent Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center" data-testid="stat-active-listings">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-active-listings-count">
                {activeListings}
              </div>
              <div className="text-muted-foreground text-sm">Active Listings</div>
            </div>
            <div className="text-center" data-testid="stat-pending-bookings">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-pending-bookings-count">
                {pendingBookings}
              </div>
              <div className="text-muted-foreground text-sm">Pending Inspections</div>
            </div>
            <div className="text-center" data-testid="stat-monthly-views">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-monthly-views-count">
                0
              </div>
              <div className="text-muted-foreground text-sm">Monthly Views</div>
            </div>
            <div className="text-center" data-testid="stat-rating">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-rating-value">
                5.0
              </div>
              <div className="text-muted-foreground text-sm">Average Rating</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-add-listing"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Listing
            </Button>
            <Button 
              variant="secondary"
              data-testid="button-view-analytics"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card data-testid="card-recent-bookings">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Recent Booking Requests</h3>
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-8" data-testid="empty-bookings">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No booking requests yet</p>
                <p className="text-sm text-muted-foreground">Booking requests will appear here</p>
              </div>
            ) : (
              bookings.slice(0, 5).map((booking: any, index: number) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border border-border rounded-lg" data-testid={`booking-request-${index}`}>
                  <div>
                    <h4 className="font-medium text-foreground" data-testid={`booking-student-${index}`}>
                      {booking.student?.firstName || booking.student?.email || 'Anonymous Student'}
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid={`booking-hostel-${index}`}>
                      {booking.hostel?.title || 'Unknown Hostel'}
                    </p>
                    <p className="text-xs text-muted-foreground" data-testid={`booking-date-${index}`}>
                      {booking.preferredDate ? new Date(booking.preferredDate).toLocaleDateString() : 'Date TBD'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 text-white hover:bg-green-700" data-testid={`button-approve-${index}`}>
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" data-testid={`button-message-${index}`}>
                      Message
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* My Listings */}
      <Card data-testid="card-my-listings">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">My Listings</h3>
          <div className="space-y-4">
            {hostels.length === 0 ? (
              <div className="text-center py-8" data-testid="empty-listings">
                <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No listings yet</p>
                <p className="text-sm text-muted-foreground">Create your first listing to start receiving bookings</p>
              </div>
            ) : (
              hostels.slice(0, 3).map((hostel: any, index: number) => (
                <div key={hostel.id} className="flex items-center justify-between p-4 border border-border rounded-lg" data-testid={`listing-${index}`}>
                  <div>
                    <h4 className="font-medium text-foreground" data-testid={`listing-title-${index}`}>
                      {hostel.title}
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid={`listing-price-${index}`}>
                      ₦{hostel.price?.toLocaleString()} per {hostel.priceType || 'semester'}
                    </p>
                    <span 
                      className={`text-xs px-2 py-1 rounded-full ${
                        hostel.availability ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                      data-testid={`listing-status-${index}`}
                    >
                      {hostel.availability ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" data-testid={`button-edit-${index}`}>
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" data-testid={`button-view-${index}`}>
                      View
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
