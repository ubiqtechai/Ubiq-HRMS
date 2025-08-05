import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            Your Project Starts Here
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A beautiful, clean foundation ready for your next big idea.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" className="text-lg px-8">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8">
            Learn More
          </Button>
        </div>
        
        <div className="mt-16 p-8 bg-card/50 backdrop-blur-sm rounded-2xl border shadow-soft">
          <p className="text-muted-foreground">
            Built with React, TypeScript, Tailwind CSS, and modern design principles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;