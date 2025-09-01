import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
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
      <header className="bg-background/95 backdrop-blur-md shadow-sm border-b border-border sticky top-0 z-50" data-testid="header-navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-gradient" data-testid="text-logo">CampusHostel</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="text-foreground hover:text-primary px-3 py-2 rounded-lg text-sm font-medium transition-colors" data-testid="link-browse-hostels">Browse Hostels</a>
                <a href="#" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg text-sm font-medium transition-colors" data-testid="link-list-property">List Property</a>
                <a href="#" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg text-sm font-medium transition-colors" data-testid="link-help">Help</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-medium transition-all focus-ring"
                data-testid="button-signin"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="relative py-20 md:py-32 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient leading-tight" data-testid="text-hero-title">
                Find Your Perfect<br />
                <span className="text-foreground">Student Hostel</span>
              </h1>
              <p className="text-lg md:text-xl mb-12 text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-description">
                Discover comfortable, affordable accommodation near your university with verified listings and seamless booking
              </p>
            </div>
            
            {/* Search Form */}
            <Card className="max-w-5xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-border/50 card-hover" data-testid="card-search-form">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-3" data-testid="label-university">University</label>
                    <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                      <SelectTrigger className="w-full h-12 rounded-lg border-2 focus-ring" data-testid="select-university">
                        <SelectValue placeholder="Select your university" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        <SelectItem value="kwasu" data-testid="option-kwasu">Kwara State University (KWASU)</SelectItem>
                        <SelectItem value="unilorin" data-testid="option-unilorin">University of Ilorin</SelectItem>
                        <SelectItem value="oau" data-testid="option-oau">Obafemi Awolowo University</SelectItem>
                        <SelectItem value="ui" data-testid="option-ui">University of Ibadan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3" data-testid="label-price-range">Price Range</label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger className="w-full h-12 rounded-lg border-2 focus-ring" data-testid="select-price-range">
                        <SelectValue placeholder="Any price" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        <SelectItem value="50000-100000" data-testid="option-price-50k-100k">₦50,000 - ₦100,000</SelectItem>
                        <SelectItem value="100000-200000" data-testid="option-price-100k-200k">₦100,000 - ₦200,000</SelectItem>
                        <SelectItem value="200000+" data-testid="option-price-200k-plus">₦200,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">&nbsp;</label>
                    <Button 
                      onClick={handleSearch}
                      className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold text-base transition-all focus-ring shadow-lg"
                      data-testid="button-search"
                    >
                      Search Hostels
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-secondary/30 border-t border-b border-border/50" data-testid="section-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3 transition-all group-hover:scale-110" data-testid="stat-hostels">500+</div>
              <div className="text-muted-foreground font-medium" data-testid="stat-hostels-label">Verified Hostels</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3 transition-all group-hover:scale-110" data-testid="stat-universities">50+</div>
              <div className="text-muted-foreground font-medium" data-testid="stat-universities-label">Universities</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3 transition-all group-hover:scale-110" data-testid="stat-students">10,000+</div>
              <div className="text-muted-foreground font-medium" data-testid="stat-students-label">Happy Students</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3 transition-all group-hover:scale-110" data-testid="stat-cities">25+</div>
              <div className="text-muted-foreground font-medium" data-testid="stat-cities-label">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background relative overflow-hidden" data-testid="section-features">
        <div className="absolute inset-0 pattern-lines opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="text-features-title">Why Choose CampusHostel?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-features-description">We make finding student accommodation simple, safe, and affordable with our modern platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group card-hover" data-testid="feature-verified">
              <div className="bg-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                <Shield className="text-primary h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4" data-testid="text-feature-verified-title">Verified Listings</h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-feature-verified-description">All agents and properties are thoroughly verified for your safety and peace of mind.</p>
            </div>
            
            <div className="text-center group card-hover" data-testid="feature-location">
              <div className="bg-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                <MapPin className="text-primary h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4" data-testid="text-feature-location-title">Location-Based Search</h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-feature-location-description">Find hostels near your university with our integrated map feature and location services.</p>
            </div>
            
            <div className="text-center group card-hover" data-testid="feature-booking">
              <div className="bg-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                <Calendar className="text-primary h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4" data-testid="text-feature-booking-title">Easy Booking</h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-feature-booking-description">Schedule inspections with one click and get instant confirmations from verified agents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/20 border-t border-border/50" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Find Your Perfect Hostel?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Join thousands of students who have found their ideal accommodation through CampusHostel</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold text-base transition-all focus-ring shadow-lg"
            >
              Get Started
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg font-semibold text-base transition-all focus-ring"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t-2 border-border" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <span className="text-3xl font-bold text-gradient" data-testid="text-footer-logo">CampusHostel</span>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed max-w-md" data-testid="text-footer-description">
                Making student accommodation search easier, safer, and more affordable across Nigerian universities.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-foreground mb-6" data-testid="text-footer-students-title">For Students</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-browse">Browse Hostels</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-how">How It Works</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-guide">Student Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-foreground mb-6" data-testid="text-footer-agents-title">For Agents</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-list">List Property</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-verification">Verification Process</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-dashboard">Agent Dashboard</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground" data-testid="text-footer-copyright">&copy; 2024 CampusHostel. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">Terms of Service</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
