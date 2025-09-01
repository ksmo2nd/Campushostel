import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Shield, MapPin, Calendar } from "lucide-react";

export default function Landing() {
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    console.log("Search initiated", { selectedUniversity, priceRange });
    // TODO: Implement search functionality
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-border sticky top-0 z-50" data-testid="header-navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-primary" data-testid="text-logo">CampusHostel</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium" data-testid="link-browse-hostels">Browse Hostels</a>
                <a href="#" className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium" data-testid="link-list-property">List Property</a>
                <a href="#" className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium" data-testid="link-help">Help</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-signin"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="gradient-bg text-white py-12 md:py-20" data-testid="section-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-hero-title">Find Your Perfect Student Hostel</h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100" data-testid="text-hero-description">Discover comfortable, affordable accommodation near your university</p>
            
            {/* Search Form */}
            <Card className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6" data-testid="card-search-form">
              <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 p-0">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2" data-testid="label-university">University</label>
                  <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                    <SelectTrigger className="w-full" data-testid="select-university">
                      <SelectValue placeholder="Select your university" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kwasu" data-testid="option-kwasu">Kwara State University (KWASU)</SelectItem>
                      <SelectItem value="unilorin" data-testid="option-unilorin">University of Ilorin</SelectItem>
                      <SelectItem value="oau" data-testid="option-oau">Obafemi Awolowo University</SelectItem>
                      <SelectItem value="ui" data-testid="option-ui">University of Ibadan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2" data-testid="label-price-range">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="w-full" data-testid="select-price-range">
                      <SelectValue placeholder="Any price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50000-100000" data-testid="option-price-50k-100k">₦50,000 - ₦100,000</SelectItem>
                      <SelectItem value="100000-200000" data-testid="option-price-100k-200k">₦100,000 - ₦200,000</SelectItem>
                      <SelectItem value="200000+" data-testid="option-price-200k-plus">₦200,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">&nbsp;</label>
                  <Button 
                    onClick={handleSearch}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="button-search"
                  >
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-secondary/50" data-testid="section-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-hostels">500+</div>
              <div className="text-muted-foreground" data-testid="stat-hostels-label">Verified Hostels</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-universities">50+</div>
              <div className="text-muted-foreground" data-testid="stat-universities-label">Universities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-students">10,000+</div>
              <div className="text-muted-foreground" data-testid="stat-students-label">Happy Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-cities">25+</div>
              <div className="text-muted-foreground" data-testid="stat-cities-label">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30" data-testid="section-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-features-title">Why Choose CampusHostel?</h2>
            <p className="text-lg text-muted-foreground" data-testid="text-features-description">We make finding student accommodation simple, safe, and affordable</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="feature-verified">
              <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-feature-verified-title">Verified Listings</h3>
              <p className="text-muted-foreground" data-testid="text-feature-verified-description">All agents and properties are verified for your safety and peace of mind.</p>
            </div>
            
            <div className="text-center" data-testid="feature-location">
              <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-feature-location-title">Location-Based Search</h3>
              <p className="text-muted-foreground" data-testid="text-feature-location-description">Find hostels near your university with our integrated map feature.</p>
            </div>
            
            <div className="text-center" data-testid="feature-booking">
              <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-feature-booking-title">Easy Booking</h3>
              <p className="text-muted-foreground" data-testid="text-feature-booking-description">Schedule inspections with one click and get instant confirmations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <span className="text-2xl font-bold text-primary" data-testid="text-footer-logo">CampusHostel</span>
              <p className="text-muted-foreground mt-4" data-testid="text-footer-description">Making student accommodation search easier across Nigerian universities.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="text-footer-students-title">For Students</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-browse">Browse Hostels</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-how">How It Works</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-guide">Student Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="text-footer-agents-title">For Agents</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-list">List Property</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-verification">Verification Process</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-dashboard">Agent Dashboard</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="text-footer-support-title">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-help">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-contact">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-terms">Terms & Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground" data-testid="text-footer-copyright">&copy; 2024 CampusHostel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
