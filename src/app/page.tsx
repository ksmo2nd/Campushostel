import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { Shield, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-background/95 backdrop-blur-md shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-gradient">CampusHostel</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/hostels" className="text-foreground hover:text-primary px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  Browse Hostels
                </Link>
                <Link href="/list-property" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  List Property
                </Link>
                <Link href="/help" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  Help
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/auth/login">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-medium transition-all focus-ring">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient leading-tight">
                Find Your Perfect<br />
                <span className="text-foreground">Student Hostel</span>
              </h1>
              <p className="text-lg md:text-xl mb-12 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discover comfortable, affordable accommodation near your university with verified listings and seamless booking
              </p>
            </div>
            
            {/* Search Form */}
            <Card className="max-w-5xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-border/50 card-hover">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-3">University</label>
                    <Select>
                      <SelectTrigger className="w-full h-12 rounded-lg border-2 focus-ring">
                        <SelectValue placeholder="Select your university" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        <SelectItem value="kwasu">Kwara State University (KWASU)</SelectItem>
                        <SelectItem value="unilorin">University of Ilorin</SelectItem>
                        <SelectItem value="oau">Obafemi Awolowo University</SelectItem>
                        <SelectItem value="ui">University of Ibadan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">Price Range</label>
                    <Select>
                      <SelectTrigger className="w-full h-12 rounded-lg border-2 focus-ring">
                        <SelectValue placeholder="Any price" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        <SelectItem value="50000-100000">₦50,000 - ₦100,000</SelectItem>
                        <SelectItem value="100000-200000">₦100,000 - ₦200,000</SelectItem>
                        <SelectItem value="200000+">₦200,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">&nbsp;</label>
                    <Link href="/hostels">
                      <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold text-base transition-all focus-ring shadow-lg">
                        Search Hostels
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-secondary/30 border-t border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3 transition-all group-hover:scale-110">500+</div>
              <div className="text-muted-foreground font-medium">Verified Hostels</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3 transition-all group-hover:scale-110">50+</div>
              <div className="text-muted-foreground font-medium">Universities</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3 transition-all group-hover:scale-110">10,000+</div>
              <div className="text-muted-foreground font-medium">Happy Students</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3 transition-all group-hover:scale-110">25+</div>
              <div className="text-muted-foreground font-medium">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pattern-lines opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Why Choose CampusHostel?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We make finding student accommodation simple, safe, and affordable with our modern platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group card-hover">
              <div className="bg-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                <Shield className="text-primary h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Verified Listings</h3>
              <p className="text-muted-foreground leading-relaxed">All agents and properties are thoroughly verified for your safety and peace of mind.</p>
            </div>
            
            <div className="text-center group card-hover">
              <div className="bg-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                <MapPin className="text-primary h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Location-Based Search</h3>
              <p className="text-muted-foreground leading-relaxed">Find hostels near your university with our integrated map feature and location services.</p>
            </div>
            
            <div className="text-center group card-hover">
              <div className="bg-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                <Calendar className="text-primary h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Easy Booking</h3>
              <p className="text-muted-foreground leading-relaxed">Schedule inspections with one click and get instant confirmations from verified agents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/20 border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Find Your Perfect Hostel?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Join thousands of students who have found their ideal accommodation through CampusHostel</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold text-base transition-all focus-ring shadow-lg">
                Get Started
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg font-semibold text-base transition-all focus-ring"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t-2 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <span className="text-3xl font-bold text-gradient">CampusHostel</span>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed max-w-md">
                Making student accommodation search easier, safer, and more affordable across Nigerian universities.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-foreground mb-6">For Students</h3>
              <ul className="space-y-3">
                <li><Link href="/hostels" className="text-muted-foreground hover:text-foreground transition-colors">Browse Hostels</Link></li>
                <li><Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</Link></li>
                <li><Link href="/guide" className="text-muted-foreground hover:text-foreground transition-colors">Student Guide</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-foreground mb-6">For Agents</h3>
              <ul className="space-y-3">
                <li><Link href="/list-property" className="text-muted-foreground hover:text-foreground transition-colors">List Property</Link></li>
                <li><Link href="/verification" className="text-muted-foreground hover:text-foreground transition-colors">Verification Process</Link></li>
                <li><Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Agent Dashboard</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">&copy; 2024 CampusHostel. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}