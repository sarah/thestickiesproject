desc "Verify Rcov coverage threshold"
task :verify_coverage_threshold do
  CodeCoverageThreshold = 100.0
  
  GrimReaper = <<-EOF
 
 
                           .,od88888888888bo,.
                       .d88888888888888888888888b.
                    .d88888888888888888888888888888b.
                  .d888888888888888888888888888888888b.
                .d8888888888888888888888888888888888888b.
               d88888888888888888888888888888888888888888b
              d8888888888888888888888888888888888888888888b
             d888888888888888888888888888888888888888888888
             8888888888888888888888888888888888888888888888
             8888888888888888888888888888888888888888888888
             8888888888888888888888888888888888888888888888
             Y88888888888888888888888888888888888888888888P
             "8888888888P'   "Y8888888888P"    "Y888888888"
              88888888P        Y88888888P        Y88888888
              Y8888888          ]888888P          8888888P
               Y888888          d888888b          888888P
                Y88888b        d88888888b        d88888P
                 Y888888b.   .d88888888888b.   .d888888
                  Y8888888888888888P Y8888888888888888
                   888888888888888P   Y88888888888888
                   "8888888888888[     ]888888888888"
                      "Y888888888888888888888888P"
                           "Y88888888888888P"
                        888b  Y8888888888P  d888
                        "888b              d888"
                         Y888bo.        .od888P
                          Y888888888888888888P
                           "Y88888888888888P"
                             "Y8888888888P"
     d8888bo.                  "Y888888P"                  .od888b
    888888888bo.                  """"                  .od8888888
    "88888888888b.                                   .od888888888[
    d8888888888888bo.                              .od888888888888
  d88888888888888888888bo.                     .od8888888888888888b
  ]888888888888888888888888bo.            .od8888888888888888888888b=
  888888888P" "Y888888888888888bo.     .od88888888888888P" "Y888888P=
   Y8888P"           "Y888888888888bd888888888888P"            "Y8P
     ""                   "Y8888888888888888P"
                            .od8888888888bo.
                        .od888888888888888888bo.
                    .od8888888888P"  "Y8888888888bo.
                 .od8888888888P"        "Y8888888888bo.
             .od88888888888P"              "Y88888888888bo.
   .od888888888888888888P"                    "Y8888888888888888bo.
  Y8888888888888888888P"                         "Y8888888888888888b=
  888888888888888888P"                            "Y8888888888888888=
   "Y888888888888888       COVERAGE FAILURE         "Y88888888888888P=
        ""Y8888888P                                  "Y888888P"
           "Y8888P                                     Y888P"
              ""                                        """
  EOF
  index_html = File.expand_path("coverage/index.html")
  raise unless File.exist?(index_html)
  
  total_coverage_regex = /<tt class='coverage_total'>\s*(\d+\.\d+)%\s*<\/tt>/
  total_coverage = 0
  
  File.open(index_html).each_line do |line|
    if line =~ /<tt class='coverage_total'>\s*(\d+\.\d+)%\s*<\/tt>/
      total_coverage = $1.to_f
      break
    end
  end
  
  if total_coverage < CodeCoverageThreshold
    puts GrimReaper
    puts "You were expected to maintain #{CodeCoverageThreshold}% coverage, but you have fallen short at #{total_coverage}%."
    exit(1)
  end
end

