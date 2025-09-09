# Define local variables
locals {
  configs = nonsensitive(module.config.configs) # Retrieve configurations from the config module
  secrets = module.config.secret_data
}

# Module for configuring common settings
module "config" {
  source                = "git@github.com:Golden-Capital-Holdings/zb-shared-infra.git//infra/terraform/modules/config?ref=main"
  enable_config_secrets = true
}

# Invoke S3 bucket module to create S3 bucket
module "s3_bucktet" {
  source       = "git@github.com:Golden-Capital-Holdings/zb-shared-infra.git//infra/terraform/modules/aws_s3_bucket?ref=main"
  org_name     = lookup(local.configs, "org_name")
  app_name     = lookup(local.configs, "app_name")
  service_name = lookup(local.configs, "service_name")
}

# Invoke CloudFront module to create CloudFront
module "cloudfront" {
  source                      = "git@github.com:Golden-Capital-Holdings/zb-shared-infra.git//infra/terraform/modules/aws_cloudfront?ref=main"
  org_name                    = lookup(local.configs, "org_name")
  app_name                    = lookup(local.configs, "app_name")
  bucket_name                 = module.s3_bucktet.bucket_name
  aliases                     = lookup(local.configs, "aliases")
  bucket_id                   = module.s3_bucktet.bucket_id
  bucket_regional_domain_name = module.s3_bucktet.bucket_regional_domain_name
  cloudfront_description      = lookup(local.configs, "cloudfront_description")
  default_root_object         = lookup(local.configs, "default_root_object")
  allowed_methods             = lookup(local.configs, "allowed_methods")
  acm_certificate             = lookup(local.configs, "acm_certificate_arns")
}

# Invoke ACM certificate module to create ACM certificate
module "acm_certificate" {
  source                  = "git@github.com:Golden-Capital-Holdings/zb-shared-infra.git//infra/terraform/modules/aws_acm_certificate?ref=main"
  acm_certificate_domains = lookup(local.configs, "acm_certificate_domains", {})
}
