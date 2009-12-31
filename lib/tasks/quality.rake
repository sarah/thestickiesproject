begin
  require 'the_metric_system'
  namespace :quality do
    desc "Analyze for code complexity"
    task :flog do
      TheMetricSystem::UnitsOfMeasure::FlogUnits.report_to_standards_body(:threshold => 40, :directories => ['app', 'lib'])
    end
 
    desc "Analyze for code duplication"
    task :flay do
      TheMetricSystem::UnitsOfMeasure::FlayUnits.report_to_standards_body(:threshold => 50, :directories => Dir["app/**/*.rb", "lib/**/*.rb"])
    end
  end
 
  desc "Run all quality related tasks"
  task :quality => ['quality:flog', 'quality:flay']
 
rescue LoadError => ex
  task :quality do
    puts "Unable to find flog or flay"
    puts "  Full details: #{ex.message}"
  end
end

